module.exports = {
    name: "setup",
    description: "Setup the Server.",
    async execute(message, args) {
        const Discord = require("discord.js");
        const fs = require("fs");

        let setupEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(message.guild.name + " - Setup")
            .setAuthor("Project Erilum")
            .setDescription("Setting up the Bot for " + message.guild.name)
            .setFooter("© Ethirical Productions")
            .setThumbnail(message.guild.iconURL())
            .setTimestamp()
            .addField("Server ID", message.guild.id, true)
            .addField("Setup", "Starting...", true)
            .addField("Server Creation Date", message.guild.createdAt.getDate() + "/" + message.guild.createdAt.getMonth() + "/" + message.guild.createdAt.getFullYear(), false)
            .addField("Bot Join Date", message.guild.joinedAt.getDate() + "/" + message.guild.joinedAt.getMonth() + "/" + message.guild.joinedAt.getFullYear(), true);

        let sender = message.guild.member(message.author.id);
        if (sender.hasPermission("ADMINISTRATOR") && !fs.existsSync("./Project Erilum JS Files/ServerConfigFiles/" + message.guild.id.toString() + ".json")) {
            let msg = await message.channel.send(setupEmbed);
            setup(message);

            setupEmbed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle(message.guild.name + " - Setup")
                .setAuthor("Project Erilum")
                .setDescription("Setting up the Bot for " + message.guild.name)
                .setFooter("© Ethirical Productions")
                .setThumbnail(message.guild.iconURL())
                .setTimestamp()
                .addField("Server ID", message.guild.id, true)
                .addField("Setup", "Complete!", true)
                .addField("Server Creation Date", message.guild.createdAt.getDate() + "/" + message.guild.createdAt.getMonth() + "/" + message.guild.createdAt.getFullYear(), false)
                .addField("Bot Join Date", message.guild.joinedAt.getDate() + "/" + message.guild.joinedAt.getMonth() + "/" + message.guild.joinedAt.getFullYear(), true);

            await msg.edit(setupEmbed);

        } else if(!sender.hasPermission("ADMINISTRATOR")) {
            message.channel.send("Sorry, you do not have Permissions for that command!");
        } else {
            message.channel.send("Setup has already been completed!")
        }

        function setup(msg) {
            const config = require('./config.json');
            try {
                fs.copyFileSync("./Project Erilum JS Files/ServerConfigFiles/defaultTemplate.json", "./Project Erilum JS Files/ServerConfigFiles/" + msg.guild.id.toString() + ".json");
                let serverFileRAW = fs.readFileSync("./Project Erilum JS Files/ServerConfigFiles/" + msg.guild.id.toString() + ".json");
                let serverFile = JSON.parse(serverFileRAW.toString());
                serverFile.setupRan = true;
                fs.writeFileSync("./Project Erilum JS Files/ServerConfigFiles/" + msg.guild.id.toString() + ".json", JSON.stringify(serverFile));
            } catch (e) {
                throw new Error("Setup Failed: " + e);
            }
        }
    },
};