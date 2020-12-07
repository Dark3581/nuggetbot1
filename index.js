

const { executionAsyncResource } = require('async_hooks');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const fs = require('fs')



const { YTSearcher } = require('ytsearcher');

const queue = new Map();

const searcher = new YTSearcher({
    key: process.env.youtube_api,
    revealed: true
});

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./commands/', (e, f) =>{
    if(e) return console.error(e);
    f.forEach(file => {
        if(!file.endsWith('.js')) return
        console.log(`${file} has been loaded`)
        let cmd = require(`./commands/${file}`);
        let cmdName = cmd.config.name;
        client.commands.set(cmdName, cmd)
        cmd.config.aliases.forEach(alias => {
            client.aliases.set(alias, cmdName);
        })

    })
})



client.on("ready", () => {
    console.log("I am online!")
    console.log(`I am in ${client.guilds.cache.size} servers`)
    client.user.setActivity('The McDonalds Drive-Thru', {type: 'WATCHING'});
})

client.on("message", async(message) => {
    if (message.channel.type === "dm") return
    const prefix = '.';

    if(!message.content.startsWith(prefix)) return

    const serverQueue = queue.get(message.guild.id);

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))

    if(!message.guild.me.permissions.has(
        "EMBED_LINKS" 
    ))
    return message.channel.send('I must have embed links permission')


    if(!cmd) return

    try {
        cmd.run(client, message, args, queue, searcher);
    }catch (err){
        return console.error(err)
    }
    
                   
     
})

client.login(process.env.token)

