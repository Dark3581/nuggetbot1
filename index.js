

const { executionAsyncResource } = require('async_hooks');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');



const { YTSearcher } = require('ytsearcher');

const searcher = new YTSearcher({
    key: process.env.youtube_api,
    revealed: true
});

const client = new Discord.Client();

const queue = new Map();

client.on("ready", () => {
    console.log("I am online!")
    console.log(`I am in ${client.guilds.cache.size} servers`)
    client.user.setActivity('The McDonalds Drive-Thru', {type: 'WATCHING'});
})

client.on("message", async(message) => {
    if (message.channel.type === "dm") return
    const prefix = '.';

    if(!message.content.startsWith(prefix)) return

    const serverQueue = queue.get(message.guild.id);

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();
    switch(command){
        case 'play':
            execute(message, serverQueue);
            break;
        case 'stop':
            stop(message, serverQueue);
            break;
        case 'skip':
            skip(message, serverQueue);
            break;
        case 'pause':
            pause(serverQueue);
            break;
        case 'resume':
            resume(serverQueue);
            break;
        case 'loop':
            Loop(args, serverQueue);
            break;
        case 'queue':
            Queue(serverQueue);
            break;
        case 'fuckoff':
            stop(message, serverQueue);
            break;
        case 'help':
            help(message);
            break;
                   
        }

    async function execute(message, serverQueue){
        if(args.length <= 0)
            return message.channel.send('Please write the name of the song')
        let vc = message.member.voice.channel;
        if(!vc){
            return message.channel.send("Please join a voice chat first");
        }else{
            let result = await searcher.search(args.join(" "), { type: "video" })
        if(result.first === null || result.totalResults === 0) 
                return message.channel.send(":x: **No results**")
            let vc1  = message.guild.voiceConnection;
        if(!vc1){
        return queue.delete(message.guild.id);}
            const songInfo = await ytdl.getInfo(result.first.url)

            let song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url
            };

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
                    let connection = await vc.join();
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
                return message.channel.send(`The song has been added \`${song.title}\``);
            }
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
            serverQueue.txtChannel.send(`**Playing** :notes:  \`${serverQueue.songs[0].title}\` - Now!`)
    }
    function stop (message, serverQueue){
        if(!serverQueue)
            return message.channel.search('There is no music playing!')
        if(message.member.voice.channel != message.guild.me.voice.channel)
            return message.channel.send("You need to join the voice chat first!")
        message.react('🇰');
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    }
    function skip (message, serverQueue){
        if(message.member.voice.channel != message.guild.me.voice.channel)
            return message.channel.send("You need to join the voice chat first");
        if(!serverQueue)
            return message.channel.send("There is nothing to skip!");
        
        serverQueue.connection.dispatcher.end();
    }
    function pause(serverQueue){
        if(!serverQueue)
            return message.channel.send("There is no music currently playing!");
        if(message.member.voice.channel != message.guild.me.voice.channel)
            return message.channel.send("You are not in the voice channel!")
        if(serverQueue.connection.dispatcher.paused)
            return message.channel.send("The song is already paused");
        
        serverQueue.connection.dispatcher.pause();
        message.channel.send("The song has been paused!");
    

    }
    function resume(serverQueue){
        if(!serverQueue)
            return message.channel.send("There is no music currently playing!");
        if(message.member.voice.channel != message.guild.me.voice.channel)
            return message.channel.send("You are not in the voice channel!")
        if(serverQueue.connection.dispatcher.resumed)
            return message.channel.send("The song is already playing!");
     
        serverQueue.connection.dispatcher.resume();
        message.channel.send("The song has been resumed!");
    }
    function Loop(args, serverQueue){
        if(!serverQueue)
            return message.channel.send("There is no music currently playing!");
        if(message.member.voice.channel != message.guild.me.voice.channel)
            return message.channel.send("You are not in the voice channel!")
        if(args.length <=0)
            return message.channel.send('Please specify what loop you want. `.loop once/on/off`')

        switch(args[0].toLowerCase()){
           case 'on':
               serverQueue.loopall = !serverQueue.loopall;
               serverQueue.loopone = false;

               if(serverQueue.loopall === true)
                   message.channel.send("Loop has been turned on!");
               else
                    message.channel.send("Loop has been truned off!");

               break;
            case 'once':
                serverQueue.loopone = !serverQueue.loopone;
                serverQueue.loopall = false;

                if(serverQueue.loopone === true)
                    message.channel.send("Song will be looped once");
                else
                    message.channel.send("Loop once has been truned off!");
                break;
            case 'off':
                    serverQueue.loopall = false;
                    serverQueue.loopone = false;

                    message.channel.send("Loop has been turned off!");
                break;
            default:
                message.channel.send("Please specify what loop you want. `.loop once/on/off`"); 
        }
        
    }
    function Queue(serverQueue){
        if(!serverQueue)
            return message.channel.send("There is no music currently playing!");
        if(message.member.voice.channel != message.guild.me.voice.channel)
            return message.channel.send("You are not in the voice channel!")
            

        let nowPlaying = serverQueue.songs[0];
        let qMsg =  `${nowPlaying.title}\n \n`
        let lMsg = ''
            if (serverQueue.loopall === false && serverQueue.loopone === false) lMsg = 'Off'
           else if (serverQueue.loopone === true) lMsg = 'Once'
           else if (serverQueue.loopall === true) lMsg = 'On'

        for(var i = 1; i < serverQueue.songs.length; i++){
            qMsg += ` **${i}.** \`${serverQueue.songs[i].title}\`\n`
    
        }
        
        const queueE = new Discord.MessageEmbed()
            .setTitle('Nugget Music Queue')
            .setThumbnail('https://media.giphy.com/media/mwydbpQgyVC5vK7oXF/giphy.gif')
            .addFields(
                { name: 'Now Playing',
                 value: qMsg },
                 {name: 'Queue Length', value: i, inline: true },
                {name: 'Loop', value: lMsg, inline: true },
            )


        message.channel.send(queueE);
    }
   
    function help(message){
        const embed = new Discord.MessageEmbed()
            .setTitle('Nugget Music Commands')
            .setURL('https://discord.gg/YtppaeN')
            .setThumbnail('https://media.giphy.com/media/mwydbpQgyVC5vK7oXF/giphy.gif')
            .addFields(
                { name: 'Commands', value: `
                 \"Stop\" - Stops what ever is playing on the bot
        
                \"Play SONG\" - Plays the song you want
                
                \"Skip\" - Skips the current song playing
                
                \"Queue\" - Shows the current queue
                
                \"Loop once/on/off\" - Loops the song playing
                
                \"Pause\" - Pauses the song playing
                
                \"Resume\" - Resumes the song that was paused` },
                { name: '\u200B', value: '\u200B' },
            )
            .setImage('https://media.giphy.com/media/u3Ykz2ujwZYCjFlxt2/giphy.gif')
            .setFooter('Discord Invite: https://discord.gg/YtpaeN Discord Tag:Donny#6666');

message.channel.send(embed);
}
})

client.login(process.env.token)

