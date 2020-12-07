
const Discord = require('discord.js');
module.exports.run = (message) =>{
    const embed = new Discord.MessageEmbed()
    .setTitle('Nugget Music Commands')
    .setURL('https://discord.gg/YtppaeN')
    .setThumbnail('https://media.giphy.com/media/mwydbpQgyVC5vK7oXF/giphy.gif')
    .addFields(
        { name: 'Commands', value: `\`\`\`
Play <Song/YT Link>
Pause
Stop
Resume
Skip
Queue
Loop <Once/On/Off>\`\`\``, 
         inline: true}, 
    )
    .setImage('https://media.giphy.com/media/u3Ykz2ujwZYCjFlxt2/giphy.gif')
    .setFooter('Discord Invite: https://discord.gg/YtpaeN Discord Tag:Donny#6666');

message.channel.send(embed);   
}

module.exports.config = {
    name: "help",
    aliases: ['h',]}