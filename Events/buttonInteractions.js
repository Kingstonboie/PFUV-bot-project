const { updateFIDS } = require("../Utils/flightUtils.js");
const { db } = require("../Database/db.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isButton()) return;

    const flightId = interaction.customId.split("_")[1];
    const flight = await db.get("SELECT * FROM flights WHERE id = ?", [flightId]);

    if (interaction.customId.startsWith("status_")) {
      const status = interaction.customId.split("_")[1];
      await db.run("UPDATE flights SET status = ? WHERE id = ?", [status, flightId]);

      if (status === "cancelled") {
        await interaction.reply({ content: "Are you sure you want to cancel this flight? This will not yield any points.", ephemeral: true });
      } else if (status === "arrived") {
        await interaction.reply({ content: "Please submit a screenshot of your flight from the PFTracker website.", ephemeral: true });
      }

      await updateFIDS();
    }
  },
};