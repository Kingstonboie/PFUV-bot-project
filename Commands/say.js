module.exports = {
  name: "say",
  run: (client, message, args) => {
    const toSay = args.join(" ");
    if (!toSay) return message.channel.send({ content: "You have to provide something!" });
    message.channel.send({ content: toSay });
  }
};