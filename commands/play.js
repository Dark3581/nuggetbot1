const Discord = require('discord.js')
const ytdl = require('ytdl-core');
const ytpl = require('ytpl')
module.exports.run = async (client, message, args, queue, searcher ) => {
    const vc = message.member.voice.channel;
    if(!vc)
        return message.channel.send('Join a VC');

    let url = args.join('');
    if(url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)){
        await ytdl(url).then(async playlist => {
            console.log(playlist)
        })
    }
}

module.exports.config = {
    name: 'play',
    aliases: ['p']
}