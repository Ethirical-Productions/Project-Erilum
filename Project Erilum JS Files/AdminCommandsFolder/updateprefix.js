module.exports = {
    name: "updateprefix",
    description: "Update the Command Prefix for the server",
    execute(message, args) {
        const Discord = require("discord.js");
        const fs = require("fs");
        let sender = message.guild.member(message.author.id);
        if (sender.hasPermission("ADMINISTRATOR")) {
            if (args[0].toString().length < 3 && args[0].toString().length > 0) {
                let serverFile = JSON.parse(fs.readFileSync("./Project Erilum JS Files/ServerConfigFiles/" + message.guild.id.toString() + ".json").toString());
                serverFile.prefix = args[0].toString();
                fs.writeFileSync("./Project Erilum JS Files/ServerConfigFiles/" + message.guild.id.toString() + ".json", JSON.stringify(serverFile));
                message.channel.send("Prefix updated to " + serverFile.prefix)
            } else {
                message.channel.send("Sorry, you have not entered a valid prefix - 0 < Prefix Length < 3")
            }
        } else {
            message.channel.send("Sorry, you do not have Permissions for that command!");
        }
    },
};