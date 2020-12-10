const Discord = require('discord.js');
module.exports.run = async (client, message, args, queue, searcher ) => {
    const serverQueue = queue.get(message.guild.id)
    if(!serverQueue)
            return message.channel.send("There is no music currently playing!");
        if(message.member.voice.channel != message.guild.me.voice.channel)
            return message.channel.send("You are not in the voice channel!")
        if (parseInt(args[1]) < 1 )
            return message.channel.send('There is nothing to remove on that position')
            if (args.length > 0){
        switch(args[0].toLowerCase()){
                case 'remove':
                    serverQueue.songs.splice( parseInt(args[1]), 1)
                    if (serverQueue.songs.length < parseInt(args[0]))
                        return message.channel.send("there is no song on that number")
                    break;}}
        let currentPage = 0;

        let lMsg = ''
            if (serverQueue.loopall === false && serverQueue.loopone === false) lMsg = 'Off'
           else if (serverQueue.loopone === true) lMsg = 'Once'
           else if (serverQueue.loopall === true) lMsg = 'On'

        const embeds = embedGenerator(serverQueue, lMsg)

        const queueEmbed = await message.channel.send(`Queue: ${currentPage+1}/${embeds.length}`, embeds[currentPage])
            await queueEmbed.react('◀️');
            await queueEmbed.react('▶️');

        const reactionFilter = (reaction, user) => ['◀️', '▶️'].includes(reaction.emoji.name) && (message.author.id === user.id)
        const collector = queueEmbed.createReactionCollector(reactionFilter);

        collector.on('collect', (reaction, user,) => {
            if(reaction.emoji.name === '▶️'){
                if(currentPage < embeds.length-1){
                    currentPage+=1;
                    queueEmbed.edit(`Lyrics ${currentPage+1}/${embeds.length}`, embeds[currentPage]);
                    message.reactions.resolve(reaction).users.remove(user)
                }
            }else if(reaction.emoji.name === '◀️'){
                if (currentPage !== 0){
                    currentPage -= 1;
                    queueEmbed.edit(`Lyrics ${currentPage+1}/${embeds.length}`, embeds[currentPage])
                    message.reactions.resolve(reaction).users.remove(user)
                }
            }
        })

            //console.log(serverQueue.songs)
            //console.log(args[0])    
            if (parseInt(args[1]) < 1 )
        return message.channel.send('There is nothing to remove on that position')
            
            if (args.length > 0) 
        switch(args[0].toLowerCase()){
            case 'remove':
                serverQueue.songs.splice( parseInt(args[0]), 1)
                if (serverQueue.songs.length < parseInt(args[0]))
                    return message.channel.send("there is no song on that number")
                break;

                
            
            }
        
        }
function embedGenerator(serverQueue, lMsg){
    const embeds = [];
    let songs = 10;
    for (let i = 0; i < serverQueue.songs.length; i+= 10){
        const current = serverQueue.songs.slice(i, songs)
        songs +=10;
        let j = i
        const info = current.map(song => `${++j}. [${song.title}](${song.url})`).join('\n')
        const msg = new Discord.MessageEmbed()
        .setTitle('Nugget Music Queue')
        .setThumbnail('https://media.giphy.com/media/mwydbpQgyVC5vK7oXF/giphy.gif')
        .setDescription(`Now playing [${serverQueue.songs[0].title}](${serverQueue.songs[0].url}) \n ${info} `)
        .addFields(
             {name: 'Queue Length', value: serverQueue.songs.length, inline: true },
            {name: 'Loop', value: lMsg, inline: true },)

        embeds.push(msg)
        
        }
        return embeds;
}
    
module.exports.config = {
    name: 'queue',
    aliases: ['q']
}