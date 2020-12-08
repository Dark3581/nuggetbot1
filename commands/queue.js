const Discord = require('discord.js');
module.exports.run = (client, message, args, queue, searcher ) => {
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

            //console.log(serverQueue.songs)
            console.log(args[0])
        let nowPlaying = serverQueue.songs[0];
        let qMsg =  `${nowPlaying.title}\n \n`
        let lMsg = ''
            if (serverQueue.loopall === false && serverQueue.loopone === false) lMsg = 'Off'
           else if (serverQueue.loopone === true) lMsg = 'Once'
           else if (serverQueue.loopall === true) lMsg = 'On'

        for(var i = 1; i < serverQueue.songs.length; i++){
            qMsg += ` **${i}.** \`${serverQueue.songs[i].title}\`\n`
    
        }
            
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
            
        
        
        const queueE = new Discord.MessageEmbed()
            .setTitle('Nugget Music Queue')
            .setThumbnail('https://media.giphy.com/media/mwydbpQgyVC5vK7oXF/giphy.gif')
            .addFields(
                { name: 'Now Playing',
                 value: qMsg },
                 {name: 'Queue Length', value: i, inline: true },
                {name: 'Loop', value: lMsg, inline: true },

            )
        message.channel.send(queueE)
        }

module.exports.config = {
    name: 'queue',
    aliases: ['q']
}