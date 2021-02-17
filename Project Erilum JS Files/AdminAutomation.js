const Discord = require('discord.js');
const config = require('./config.json')
const fs = require('fs');
const bot = new Discord.Client();

bot.once('ready', () => {
    console.log('--ADMIN AUTOMATION READY--');
    startAllProcesses();
});


function startAllProcesses() {
    presenceUpdate().then(r => null);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function presenceUpdate() {
    while (1 === 1) {
        await sleep(60000);
        await startPresence();
    }
}

async function startPresence() {
    let guilds = bot.guilds;
    guilds.cache.each(updatePresence);
}

async function updatePresence(server) {
    let serverFileRAW = fs.readFileSync("./Project Erilum JS Files/ServerConfigFiles/" + server.id.toString() + ".json");
    let serverFile = JSON.parse(serverFileRAW.toString());

    if (server.available && serverFile.onlineMembersEnabled && serverFile.onlineMembersChannelID !== 0) {
        server.members.fetch().then(fetchedMembers => {
            let online = fetchedMembers.filter(oMembers => oMembers.presence.status === "online").size;
            let away = fetchedMembers.filter(aMembers => aMembers.presence.status === "idle").size;
            let dnd = fetchedMembers.filter(dMembers => dMembers.presence.status === "dnd").size;
            let channel = server.channels.resolve(serverFile.onlineMembersChannelID);
            //console.log("online: " + online + ", away: " + away + ", dnd: " + dnd);
            channel.setName(`🟢 ` + online + ` 🌙 ` + away + ` 🔴 ` + dnd, "Updating Online Counter").then(r => null);
        }).catch(console.error);
    }
}

bot.login(config.token).then(r => null);