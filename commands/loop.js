const Discord = require('discord.js');
module.exports.run = (client, message, args, queue, searcher ) => {
    const serverQueue = queue.get(message.guild.id)
    if(!serverQueue)
    return message.channel.send("There is no music currently playing!");
if(message.member.voice.channel != message.guild.me.voice.channel)
    return message.channel.send("You are not in the voice channel!")
if(args.length <=0)
    return message.channel.send('Please specify what loop you want: `.loop <Once/On/Off>`')

switch(args[0].toLowerCase()){
   case 'on':
       serverQueue.loopall = !serverQueue.loopall;
       serverQueue.loopone = false;

       if(serverQueue.loopall === true)
           message.channel.send(":repeat: **Loop On**");
       else
            message.channel.send(":repeat: **Loop Off**");

       break;
    case 'once':
        serverQueue.loopone = !serverQueue.loopone;
        serverQueue.loopall = false;

        if(serverQueue.loopone === true)
            message.channel.send(":repeat_one: **Looped Once**");
        else
            message.channel.send(":repeat: **Loop Off**");
        break;
    case 'off':
            serverQueue.loopall = false;
            serverQueue.loopone = false;

            message.channel.send(":repeat: **Loop Off**");
        break;
    default:
        message.channel.send("Please specify what loop you want: `.loop <Once/On/Off>`");
}}

module.exports.config = {
    name: 'loop',
    aliases: ['l']
}