const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports.run = async(client, message, args, queue, searcher,   ) => {
    switch(args[0].toLowerCase()){
        case 'neko':
            if(message.channel.id === '739002385531404288'||
            message.channel.id === '646849145289834506'||
            message.channel.id === '785079847763574794'||
            message.channel.id === '782891383361896469'||
            message.channel.id === '784417039425994772'){  
        fetch('https://nekos.life/api/v2/img/lewd')
        .then(res => res.json())
        .then(json => {
            let nekoEmbed = new Discord.MessageEmbed()
            .setTitle('Lewd Nekos! (=^･ω･^=)')
            .setImage(json.url)
            message.channel.send(nekoEmbed)
            
            })
        }else{
            return}}}

    module.exports.config = {
        name: "hentai",
        aliases: ['ht']  
    }