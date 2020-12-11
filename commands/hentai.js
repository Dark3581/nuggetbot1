const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports.run = async(client, message, args, queue, searcher,   ) => {
if(message.channel.id === '739002385531404288'){
   
fetch('https://meme-api.herokuapp.com/gimme/hentai')
.then(res => res.json())
.then(json => {
    let memeEmbed = new Discord.MessageEmbed()
    .setTitle(json.title)
    .setImage(json.url)
    .setFooter(`Link: ${json.postLink} | Subreddit: ${json.subreddit}`)
    message.channel.send(memeEmbed)
    
});

}else{
    return message.channel.send(':x: Wrong channel')
}

}

module.exports.config ={
    name: 'hentai',
    aliases: [';)']

}