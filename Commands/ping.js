module.exports = {
  name: "ping", 
  description: "Responds with 'pong!'", 
  run: (client, message, args) => {
    message.channel.send("pong!");
  },
};