const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports.run = async(client, message, args, queue, searcher,   ) => {
   
fetch('https://meme-api.herokuapp.com/gimme/hentai')
.then(res => res.json())
.then(json => {
    let memeEmbed = new Discord.MessageEmbed()
    .setTitle(json.title)
    .setImage(json.url)
    .setFooter(`Link: ${json.postLink} | Subreddit: ${json.subreddit}`)
    message.channel.send(memeEmbed)
    
});

}

module.exports.config ={
    name: 'hentai',
    aliases: [';)']

}