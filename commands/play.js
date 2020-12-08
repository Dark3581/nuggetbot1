const Discord = require('discord.js')
const ytdl = require('ytdl-core');
const ytpl = require('ytpl')
module.exports.run = async (client, message, args, queue, searcher ) => {
    const vc = message.member.voice.channel;
    if(!vc)
        return message.channel.send('Join a VC');

    let url = args.join('');
    if(url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)){
        try{
        await ytpl(url).then(async playlist => {
            message.channel.send(`Playlist \`${playlist.title}\` **Added**`)
            playlist.items.forEach(async item => {
        await videoHandler(await ytdl.getInfo(item.shortUrl), message, vc, true);    
            })
        })
}catch(err){
    return message.channel.send(`Please insert a valid link....\n${err}`)
    }}

    else{
        let result = await searcher.search(args.join(' '), { type: 'video'})
        if(result.first == null)
            return message.channel.send(':x: **No results**');

        let songInfo = await ytdl.getInfo(result.first.url);
        return videoHandler(songInfo, message, vc)

    }
    function timeFormat(duration) {
        var hrs = ~~(duration / 3600);
        var mins = ~~((duration % 3600) / 60);
        var secs = ~~duration % 60;
      
        var ret = "";
      
        if (hrs > 0) {
          ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
      
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret; }

    async function videoHandler(songInfo, message, vc, playlist = false){
        const serverQueue = queue.get(message.guild.id);
        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
            vLength: timeFormat(songInfo.videoDetails.lengthSeconds),
            thumbnail: songInfo.videoDetails.thumbnail.thumbnails[3].url
        }
        if(!serverQueue){
            const queueConstructor = {
                txtChannel: message.channel,
                vChannel: vc,
                connection: null,
                songs: [],
                volume: 10,
                playing: true,
                loopone: false,
                loopall: false
                
            };
            queue.set(message.guild.id, queueConstructor);

            queueConstructor.songs.push(song);

            try{
                let connection = await queueConstructor.vChannel.join();
                queueConstructor.connection = connection;
                message.guild.me.voice.setSelfDeaf(true);
                play(message.guild, queueConstructor.songs[0]);
            }catch (err){
                console.error(err);
                queue.delete(message.guild.id);
                return message.channel.send(`Unable to join the voice chat ${err}`)

            }
        }else{
            serverQueue.songs.push(song);
            if(playlist) return undefined
        
            let msg = new Discord.MessageEmbed()
                .addField(song.title, '\u200B')
                .setAuthor('Added to queue', message.author.avatarURL())
                .addField('Duration:', song.vLength, {inline: true} )
                .addField('Position in queue', serverQueue.songs.lastIndexOf(song), {inline: true} )
                .setThumbnail(song.thumbnail)
            return message.channel.send(msg);  
            }
    }


function play(guild, song){
    const serverQueue = queue.get(guild.id);
    if(!song){
        serverQueue.vChannel.leave();
        queue.delete(guild.id);
    
        return;
    }
    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on('finish', () =>{
            if(serverQueue.loopone){  
                play(guild, serverQueue.songs[0]);
            }
            else if(serverQueue.loopall){
                serverQueue.songs.push(serverQueue.songs[0])
                serverQueue.songs.shift()
            }else{
                serverQueue.songs.shift()
            }
            play(guild, serverQueue.songs[0]);
            
        })
        
        let msg = new Discord.MessageEmbed()
            .setTitle('**Playing**')
            .addField(serverQueue.songs[0].title, '\u200B')
            .addField('Duration: ', song.vLength)
            .setThumbnail(serverQueue.songs[0].thumbnail)

        serverQueue.txtChannel.send(msg)}
}

module.exports.config = {
    name: 'play',
    aliases: ['p']
}