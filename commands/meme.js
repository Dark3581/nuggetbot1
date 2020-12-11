const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports.run = async(client, message, args, queue, searcher,   ) => {
let msg = await message.channel.send('c:');
fetch('https://meme-api.herokuapp.com/gimme')
.then(res => res.json())
.then(json => {
    let memeEmbed = new Discord.MessageEmbed()
    .setTitle(json.title)
    .setImage(json.url)
    .setFooter(`Link: ${json.postLink} | Subreddit: ${json.subreddit}`)
    msg.edit(memeEmbed)
});

}

module.exports.config ={
    name: 'meme',
    aliases: ['m']

}