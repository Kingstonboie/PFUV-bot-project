const { EmbedBuilder } = require("discord.js");
const { db } = require("../Database/db.js");

const updateFIDS = async (client) => {
  const flights = await db.all("SELECT * FROM flights WHERE status NOT IN ('Cancelled', 'Arrived')");
  const fidsChannel = client.channels.cache.get("FIDS_CHANNEL_ID");

  const embed = new EmbedBuilder()
    .setTitle("Flight Information Display System")
    .setColor("#0099FF")
    .setDescription("Current Active Flights")
    .addFields(
      flights.map((flight) => ({
        name: `✈️ ${flight.callsign}`,
        value: `Gate: ${flight.gate} | Departing: ${flight.departing} | Arriving: ${flight.arriving} | Status: ${flight.status}`,
        inline: false,
      }))
    );

  await fidsChannel.messages.fetch("FIDS_MESSAGE_ID").then((msg) => msg.edit({ embeds: [embed] }));
};

module.exports = { updateFIDS };