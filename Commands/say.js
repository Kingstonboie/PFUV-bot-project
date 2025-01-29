module.exports = {
  name: "say", 
  description: "Repeats the provided text.",
  run: (client, message, args) => {
    const toSay = args.join(" ");
    if (!toSay) return message.channel.send({ content: "You have to provide something!" });
    message.channel.send({ content: toSay });
  },
};