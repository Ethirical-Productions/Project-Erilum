const Discord = require('discord.js');
const config = require('./config.json')
const fs = require('fs');
const bot = new Discord.Client();

bot.once('ready', () => {
    console.log('--MAIN FILE READY--');
    bot.user.setActivity("Being developed by Ethirical Productions(c)").then(r => null);

    let guilds = bot.guilds;
    guilds.cache.each(doJSONUpdate);
});

async function doJSONUpdate(server) {
    if (fs.existsSync("./Project Erilum JS Files/ServerConfigFiles/" + server.id.toString() + ".json")) {
        let dT = JSON.parse(fs.readFileSync("./Project Erilum JS Files/ServerConfigFiles/defaultTemplate.json").toString());
        let serverJSON = JSON.parse(fs.readFileSync("./Project Erilum JS Files/ServerConfigFiles/" + server.id.toString() + ".json").toString());
        if (server.available) {
            serverJSON = {...dT, ...serverJSON};
            fs.writeFileSync("./Project Erilum JS Files/ServerConfigFiles/" + server.id.toString() + ".json", JSON.stringify(serverJSON));
        }
    }
}

AdmCommands = require('./AdminCommands');
AdmAutomation = require('./AdminAutomation');

/*bot.on('message', message => {
    console.log(message.guild.name + " -- " + message.author.username + ": " + message.content);
});*/

bot.login(config.token).then(r => null);
