const Discord = require('discord.js');
module.exports.run = (client, message, args, queue, searcher ) => {
const serverQueue = queue.get(message.guild.id)
if(!serverQueue)
    return message.channel.search('There is no music playing!')
if(message.member.voice.channel != message.guild.me.voice.channel)
    return message.channel.send("You need to join the voice chat first!")
        message.react("642435669276360744");
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();

}

module.exports.config = {
    name: 'stop',
    aliases: ['fuckoff']
}