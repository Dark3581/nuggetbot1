const Discord = require('discord.js');
const fetch = require('node-fetch');
const talkedRecently = new Set();
module.exports.run = async(client, message, args, queue, searcher,   ) => {
    if (talkedRecently.has(message.author.id)) {
        message.channel.send("Wait 1 minute before getting typing this again. - " + message.author);
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

            talkedRecently.add(message.author);
        setTimeout(() => {
          talkedRecently.delete(message.author);
        }, 90000);
            
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

                talkedRecently.add(message.author);
                setTimeout(() => {
                  talkedRecently.delete(message.author);
                }, 90000); 
                
            })
            
            }else{
                return
            }       
}}}

module.exports.config = {
name: 'subreddit',
aliases: ['sub'],


}