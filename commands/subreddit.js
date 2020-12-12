const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports.run = async(client, message, args, queue, searcher,   ) => {
    switch(args[0].toLowerCase()){
        case 'darkhumor':
        if(message.channel.id === '636641555913900034'||
        message.channel.id === '782887824575168552' ||
        message.channel.id === '784417039425994772'){    
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
            message.channel.id === '782891383361896469'||
            message.channel.id === '784417039425994772'){
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
            }break;
            case 'buttfangs':
            if(message.channel.id === '739002385531404288'||
            message.channel.id === '646849145289834506'||
            message.channel.id === '785079847763574794'||
            message.channel.id === '782891383361896469'||
            message.channel.id === '784417039425994772'){
            fetch('https://meme-api.herokuapp.com/gimme/buttfangs')
            .then(res => res.json())
            .then(json => {
                let buttEmbed = new Discord.MessageEmbed()
                .setTitle(json.title)
                .setImage(json.url)
                .setFooter(`Link: ${json.postLink} | Subreddit: ${json.subreddit}`)
                message.channel.send(buttEmbed)
                
            })
            
            }else{
                return
            }break;

            case 'meme':
                 if(message.channel.id === '636641555913900034'||
        message.channel.id === '784417039425994772'||
        message.channel.id === '782887824575168552'||
        message.channel.id === '785671878861258772'){    
        fetch('https://meme-api.herokuapp.com/gimme/dankmemes')
        .then(res => res.json())
        .then(json => {
            let memeEmbed = new Discord.MessageEmbed()
            .setTitle(json.title)
            .setImage(json.url)
            .setFooter(`Link: ${json.postLink} | Subreddit: ${json.subreddit}`)
            message.channel.send(memeEmbed)
        })
    }else{
        return
    }

}}

module.exports.config = {
name: 'subreddit',
aliases: ['sub']}