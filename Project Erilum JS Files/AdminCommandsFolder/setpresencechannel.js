module.exports = {
    name: "setpresencechannel",
    description: "Enable Presence Data for the Server",
    execute(message, args) {
        const Discord = require("discord.js");
        const fs = require("fs");
        let sender = message.guild.member(message.author.id);
        if (sender.hasPermission("ADMINISTRATOR")) {
            try {
                if (args[0] === message.guild.channels.resolve(args[0]).id) {
                    let channel = message.guild.channels.resolve(args[0]);
                    if (channel.type === "voice") {
                        let serverFileRAW = fs.readFileSync("./Project Erilum JS Files/ServerConfigFiles/" + message.guild.id.toString() + ".json");
                        let serverFile = JSON.parse(serverFileRAW.toString());
                        serverFile.onlineMembersChannelID = args[0];
                        message.channel.send(`Presence set to ${serverFile.onlineMembersChannelID}`);
                        fs.writeFileSync("./Project Erilum JS Files/ServerConfigFiles/" + message.guild.id.toString() + ".json", JSON.stringify(serverFile));
                    } else {
                        message.channel.send("Sorry, the channel must be a Voice Channel, please try again!");
                    }
                } else {
                    message.channel.send("Sorry, that input was not recognised to be a Channel ID. Please copy the Channel ID and try again!");
                }
            } catch (e) { message.channel.send("Sorry, that input was not recognised to be a Channel ID. Please copy the Channel ID and try again!"); }
        }
    },
};