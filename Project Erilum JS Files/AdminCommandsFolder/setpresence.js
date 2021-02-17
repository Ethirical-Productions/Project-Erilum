module.exports = {
    name: "setpresence",
    description: "Enable Presence Data for the Server",
    execute(message, args) {
        const Discord = require("discord.js");
        const fs = require("fs");
        let sender = message.guild.member(message.author.id);
        if (sender.hasPermission("ADMINISTRATOR")) {
            if (args[0] == "true" || args[0] == "false") {
                let serverFileRAW = fs.readFileSync("./Project Erilum JS Files/ServerConfigFiles/" + message.guild.id.toString() + ".json");
                let serverFile = JSON.parse(serverFileRAW.toString());
                if (args[0] === "true") {serverFile.onlineMembersEnabled = true; } else { serverFile.onlineMembersEnabled = false; }
                message.channel.send(`Presence set to ${serverFile.onlineMembersEnabled}`);
                fs.writeFileSync("./Project Erilum JS Files/ServerConfigFiles/" + message.guild.id.toString() + ".json", JSON.stringify(serverFile));
            } else {
                message.channel.send("Sorry, you have not entered a boolean! (true/false)")
            }
        } else {
            message.channel.send("Sorry, you do not have Permissions for that command!");
        }
    },
};