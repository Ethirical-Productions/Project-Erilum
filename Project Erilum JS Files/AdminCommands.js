const Discord = require('discord.js');
const config = require('./config.json')
const fs = require('fs');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./Project Erilum JS Files/AdminCommandsFolder").filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./AdminCommandsFolder/${file}`);
    // set a new item in the Collection with the key as the command name and the value as the exported module
    bot.commands.set(command.name, command);
}

bot.once('ready', () => {
    console.log('--ADMIN COMMANDS READY--');
});

bot.on('message', message => {
    if (!message.content.startsWith(`${config.prefix}`)) {return;}

    const args = message.content.slice(`${config.prefix}`.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!bot.commands.has(command)) {
        message.reply("That command does not exist! :(").then(r => null);
        return;
    }

    try {
        bot.commands.get(command).execute(message, args);
    } catch (e) {
        console.error(e);
        message.reply("There was an error trying to execute that command! :(").then(r => null);
    }
})



bot.login(config.token).then(r => null);