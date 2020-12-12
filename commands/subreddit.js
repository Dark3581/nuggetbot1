const Discord = require('discord.js');
const fetch = require('node-fetch');
const used = new Map();
const Duration = require('humanize-duration');
const talkedRecently = new Set();
module.exports.run = async(client, message, args, queue, searcher,   ) => {
const cooldown = used.get(message.author.id);
if (cooldown) {
    const remaining = Duration(cooldown - Date.now(), {units: ['h', 'm'], round: true});
    return message.reply(`You need to wait ${remaining} before using this command`).catch((err) => message.reply(`${err}`));

}
else{
    switch(args[0].toLowerCase()){
        case 'darkhumor':
        if(message.channel.id === '636641555913900034'){    
        fetch('https://meme-api.herokuapp.com/gimme/Darkhumoriq')
        .then(res => res.json())
        .then(json => {
            let darkEmbed = new Discord.MessageEmbed()
            .setTitle(json.title)
            .setImage(json.url)
            .setFooter(`Link: ${json.postLink} | Subreddit: ${json.subreddit}`)
            message.channel.send(darkEmbed)
            
            })
        }else{
            return
        }break;
        case 'hentai':
            if(message.channel.id === '739002385531404288'||
            message.channel.id === '646849145289834506'||
            message.channel.id === '785079847763574794'||
            message.channel.id === '782891383361896469'){
               
            fetch('https://meme-api.herokuapp.com/gimme/hentai')
            .then(res => res.json())
            .then(json => {
                let hentaiEmbed = new Discord.MessageEmbed()
                .setTitle(json.title)
                .setImage(json.url)
                .setFooter(`Link: ${json.postLink} | Subreddit: ${json.subreddit}`)
                message.channel.send(hentaiEmbed)
                
            })
            
            }else{
                return
            }        
}used.set(message.author.id, Date.now() + 1000 * 60 * 5);
setTimeout(() => { used.delete(message.author.id), 1000 * 60 * 5});}}

module.exports.config = {
name: 'subreddit',
aliases: ['sub'],


}