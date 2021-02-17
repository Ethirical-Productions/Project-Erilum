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
                if (error) { message.channel.send( "Setup has not been completed! Start it with //setup \nError Occurred: " + error) } else {
                    if (stats.isFile()) {
                        let serverFileRAW = fs.readFileSync("./Project Erilum JS Files/ServerConfigFiles/" + message.guild.id.toString() + ".json");
                        let serverFile = JSON.parse(serverFileRAW.toString());
                        let output1 = null;
                        let output2 = null;
                        if (serverFile.onlineMembersChannelID === 0) { output1 = "No Channel Selected" } else { output1 = `${serverFile.onlineMembersChannelID}` }
                        if (serverFile.totalMembersChannelID === 0) { output2 = "No Channel Selected" } else { output2 = `${serverFile.totalMembersChannelID}` }
                        let settingsPage1 = new Discord.MessageEmbed()
                            .setTitle(message.guild.name + " Settings Page 1/1")
                            .setAuthor("Project Erilum")
                            .setDescription("Use this to see current settings and how to edit them")
                            .setColor("ORANGE")
                            .setFooter("© Ethirical Productions")
                            .setTimestamp()

                            .addField("Show User Presence Data", `${serverFile.onlineMembersEnabled} - //SetPresence [Boolean]`, true)
                            .addField("Channel to use for Presence Data", output1 + " - //SetPresenceChannel [ChannelID]", true)
                            .addField("Show Total Users Data", `${serverFile.totalMembersEnabled} - //SetTotalMembers [Boolean]`, true)
                            .addField("Channel to use for Total Users Data", output2 + " - //SetTotalMembersChannel [ChannelID]", true);

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