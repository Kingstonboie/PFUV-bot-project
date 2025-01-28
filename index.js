const express = require("express"); 
const app = express();

app.listen(3000, () => {
  console.log("project is running!");
})

app.get("/", (req, res) => {
  res.send("Hello world!");
})

const Discord = require("discord.js");
const client = new Discord.Client({intents: ["Guilds", "GuildMessages", "MessageContent"]});

client.on("messageCreate", message => {
  if(message.content ===  "Hello"){
    message.channel.send("Hi!")
  }
})

client.login(process.env.token);