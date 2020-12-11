const Discord = require('discord.js');
const fetch = require('node-fetch');
const talkedRecently = new Set();
module.exports.run = async(client, message, args, queue, searcher,   ) => {
    if (talkedRecently.has(msg.author.id)) {
        msg.channel.send("Wait 1 minute before getting typing this again. - " + msg.author);
} else {

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
            talkedRecently.add(msg.author.id);
        setTimeout(() => {
          talkedRecently.delete(msg.author.id);
        }, 90000);        
}}}

module.exports.config = {
name: 'subreddit',
aliases: ['sub'],


}