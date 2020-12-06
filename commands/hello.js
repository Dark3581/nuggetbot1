const { Message } = require("discord.js");

module.exports.run = (message) =>{
    message.channel.send('Hello!!')
}

module.exports.config = {
    name: "hello",
    aliases: ['hi', 'hey', 'yo']
}