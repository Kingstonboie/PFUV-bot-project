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
const client = new Discord.Client({intents: ["Guilds", "GuildMessages", "MessageContent"], allowedMentions: ["users"]});
const fs = require("fs");
const prefix = "?"
client.commands = new Discord.Collection();
const commands = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"))
for(file of commands){
  const commandName = file.split(".")[0]
  const command = require(`./Commands/${commandName}`)
  client.commands.set(commandName, command)
}

client.on("messageCreate", message => {
if(message.content.startsWith(prefix)){
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const commandName = args.shift()
  const command = client.commands.get(commandName)
  if(!command) return message.channel.send({content: "That command doesn't exist!"})
  command.run(client, message, args)
}
})
/*if(message.content === "embed") {
  let embed = new Discord.EmbedBuilder()
  .setTitle("This is your embed title")
  .setDescription("This is your embed description")
  .setFooter({text: "This is your embed footer"})
  .setColor("#51C6A5")

  message.channel.send({embeds:[embed]})
})
*/

client.login(process.env.token);