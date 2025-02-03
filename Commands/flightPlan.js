const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("flightplan")
    .setDescription("Submit a flight plan")
    .addStringOption((option) =>
      option.setName("callsign").setDescription("Flight callsign").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("aircraft").setDescription("Aircraft type").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("departing").setDescription("Departing airport").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("gate").setDescription("Gate number").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("arriving").setDescription("Arriving airport").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("crz_fl").setDescription("Cruise flight level").setRequired(true)
    ),
  async execute(interaction) {
    const callsign = interaction.options.getString("callsign");
    const aircraft = interaction.options.getString("aircraft");
    const departing = interaction.options.getString("departing");
    const gate = interaction.options.getString("gate");
    const arriving = interaction.options.getString("arriving");
    const crz_fl = interaction.options.getString("crz_fl");

    // Save flight to database
    const db = require("../Database/db.js");
    await db.run(
      "INSERT INTO flights (callsign, aircraft, departing, gate, arriving, crz_fl, discord_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [callsign, aircraft, departing, gate, arriving, crz_fl, interaction.user.id]
    );

    // Send interactive message with buttons
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("status_scheduled").setLabel("Scheduled").setStyle("Primary"),
      new ButtonBuilder().setCustomId("status_boarding").setLabel("Boarding").setStyle("Primary"),
      new ButtonBuilder().setCustomId("status_departed").setLabel("Departed").setStyle("Primary"),
      new ButtonBuilder().setCustomId("status_arrived").setLabel("Arrived").setStyle("Success"),
      new ButtonBuilder().setCustomId("status_cancelled").setLabel("Cancelled").setStyle("Danger")
    );

    await interaction.reply({
      content: `Flight ${callsign} has been submitted. Update status:`,
      components: [row],
    });
  },
};