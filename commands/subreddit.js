module.exports.run = async(client, message, args, queue, searcher,   ) => {
    switch(args[0].toLowerCase()){
        case 'darkhumor':    
        fetch('https://meme-api.herokuapp.com/gimme/Darkhumoriq')
        .then(res => res.json())
        .then(json => {
            let darkEmbed = new Discord.MessageEmbed()
            .setTitle(json.title)
            .setImage(json.url)
            .setFooter(`Link: ${json.postLink} | Subreddit: ${json.subreddit}`)
            message.channel.send(darkEmbed)
            
            })
        case 'hentai':
            if(message.channel.id === '739002385531404288'||
            message.channel.id === '646849145289834506'||
            message.channel.id === '785079847763574794'||
            message.channel.id === '782891383361896469'){
               
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
}}

module.exports.config = {
name: 'subreddit',
aliases: ['sub']

}