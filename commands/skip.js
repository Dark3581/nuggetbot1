const Discord = require('discord.js');
module.exports.run = (client, message, args, queue, searcher ) => {
    const serverQueue = queue.get(message.guild.id)
    if(message.member.voice.channel != message.guild.me.voice.channel)
    return message.channel.send("You need to join the voice chat first");
if(!serverQueue)
    return message.channel.send("There is nothing to skip!");
if(serverQueue == null)return

serverQueue.connection.dispatcher.end();

}

module.exports.config = {
    name: 'skip',
    aliases: ['s']
}