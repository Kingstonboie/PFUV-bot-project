const express = require("express");
const app = express();
const keep_alive = require('./keep_alive.js');
const db = require("./Database/db.js");

app.listen(3000, () => {
  console.log("Project is running!");
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const Discord = require("discord.js");
const client = new Discord.Client({
  intents: ["Guilds", "GuildMessages", "MessageContent"],
  allowedMentions: { parse: ["users"] }
});

const fs = require("fs");
const prefix = "?";

client.commands = new Discord.Collection();

// Load all command files from the Commands folder
const commandFiles = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./Commands/${file}`);
  client.commands.set(command.name, command);
}

// Load the flightPlan command explicitly
const flightPlanCommand = require("./Commands/flightPlan.js");
client.commands.set(flightPlanCommand.data.name, flightPlanCommand);

client.on("messageCreate", message => {
  if (message.author.bot) return; 

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return message.channel.send({ content: "That command doesn't exist!" });

    try {
      command.run(client, message, args);
    } catch (error) {
      console.error(error);
      message.channel.send({ content: "There was an error trying to execute that command!" });
    }
  }
});

client.login(process.env.token).then(() => {
  console.log("Bot is logged in and ready!");
}).catch(err => {
  console.error("Failed to log in the bot:", err);
});
const buttonInteractions = require("./Events/buttonInteractions.js");
client.on(buttonInteractions.name, buttonInteractions.execute);