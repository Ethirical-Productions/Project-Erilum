module.exports = {
    name: "settings",
    description: "Load the server settings menu.",
    execute(message, args) {
        const Discord = require("discord.js");
        const fs = require("fs");
        let sender = message.guild.member(message.author.id);
        if (sender.hasPermission("ADMINISTRATOR")) {
            message.channel.send("TBC");
            fs.stat("./Project Erilum JS Files/ServerConfigFiles/" + message.guild.id.toString() + ".json", (error, stats) => {
                if (error) { message.channel.send( "Setup has not been completed! Start it with //setup \nError: " + error) } else {
                    if (stats.isFile()) {
                        let serverFile = JSON.parse(fs.readFileSync("./Project Erilum JS Files/ServerConfigFiles/" + message.guild.id.toString() + ".json").toString());

                        let settingsPage1 = new Discord.MessageEmbed()
                            .setTitle(message.guild.name + " Settings Page 1/1")
                            .setAuthor("Project Erilum")
                            .setDescription("Use this to see current settings and how to edit them")
                            .setColor("ORANGE")
                            .setFooter("© Ethirical Productions")
                            .setTimestamp()

                            .addField("Show User Presence Data", `${serverFile.onlineMembersEnabled} - ${serverFile.prefix}SetPresence [Boolean]`, true)
                            .addField("Channel to use for Presence Data", OnlineMembersOutput(serverFile) + ` - ${serverFile.prefix}SetPresenceChannel [ChannelID]`, true)
                            .addField("Show Total Users Data", `${serverFile.totalMembersEnabled} - ${serverFile.prefix}SetTotalMembers [Boolean]`, true)
                            .addField("Channel to use for Total Users Data", TotalMemberCountOutput(serverFile) + ` - ${serverFile.prefix}SetTotalMembersChannel [ChannelID]`, true)
                            .addField("Set New Command Prefix", `${serverFile.prefix} - ${serverFile.prefix}UpdatePrefix [Upto 2 Characters or Symbols]`, true);

                        message.channel.send(settingsPage1);

                    } else {
                        message.channel.send("Setup has not been completed! Start it with //setup");
                    }
                }
            });
        } else {
            message.channel.send("Sorry, you do not have Permissions for that command!");
        }
    },
};

function OnlineMembersOutput(serverFile) {
    if (serverFile.onlineMembersChannelID === 0) {
        return "No Channel Selected";
    } else {
        return `${serverFile.onlineMembersChannelID}`;
    }
}

function TotalMemberCountOutput(serverFile) {
    if (serverFile.onlineMembersChannelID === 0) {
        return "No Channel Selected";
    } else {
        return `${serverFile.totalMembersChannelID}`;
    }
}