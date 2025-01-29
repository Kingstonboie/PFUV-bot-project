const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "sayembed", 
  run: (client, message, args) => {
    const toSay = args.join(" "); 
    if (!toSay) return message.channel.send({ content: "You have to provide something!" }); 
    const embed = new EmbedBuilder()
      .setDescription(toSay) 
      .setColor("#51C6A5") 
      .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
    message.channel.send({ embeds: [embed] });
  },
};