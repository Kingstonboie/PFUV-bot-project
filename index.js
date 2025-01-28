const express = require("express"); 
const app = express();
const keep_alive = require('./keep_alive.js')

app.listen(3000, () => {
  console.log("project is running!");
})

app.get("/", (req, res) => {
  res.send("Hello world! ");
})

const Discord = require("discord.js");
const client = new Discord.Client({intents: ["Guilds", "GuildMessages", "MessageContent"]});

client.on("messageCreate", message => {
  if(message.content ===  "Hello"){
    message.channel.send("Hi!")
  }
  if(message.content === "embed") {
    let embed = new Discord.EmbedBuilder()
    .setTitle("This is your embed title")
    .setDescription("This is your embed description")
    .setFooter({text: "This is your embed footer"})
    .setColor("#51C6A5")
  }
})

client.login(process.env.token);