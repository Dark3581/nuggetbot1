const Discord = require('discord.js');
const api = require('imageapi.js');
module.exports.run = async(client, message, args, queue, searcher,   ) => {
let subreddits = [
    "comedyheaven",
    "dank",
    "meme",
    'memes'
]
let subreddit = subreddits[Math.floor(Math.random()*(subreddits.length)-1)]
let img = await api(subreddit)
const memeEmbed = new MessageEmbed()
.setTitle(`A meme from r/${subreddit}`)
.setURL(`https://reddit.com/r/${subreddit}`)
.setImage(img)
message.channel.send(memeEmbed)
}

module.exports.config ={
    name: 'meme',
    aliases: ['m']

}