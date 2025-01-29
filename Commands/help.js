const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "help", 
  description: "Lists all available commands and their descriptions.",
  run: (client, message, args) => {
   
    const embed = new EmbedBuilder()
      .setTitle("Command List")
      .setColor("#51C6A5") 
      .setDescription("Here are all the available commands:") 
      .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() }); 

    
    client.commands.forEach((command) => {
      embed.addFields({
        name: `**${command.name}**`, 
        value: command.description || "No description provided.", 
      });
    });
    message.channel.send({ embeds: [embed] });
  },
};