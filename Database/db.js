const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./Database/flights.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      discord_id TEXT PRIMARY KEY,
      roblox_id TEXT,
      points INTEGER DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS flights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      callsign TEXT,
      aircraft TEXT,
      departing TEXT,
      gate TEXT,
      arriving TEXT,
      crz_fl TEXT,
      status TEXT DEFAULT 'Scheduled',
      discord_id TEXT,
      submission_time DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (discord_id) REFERENCES users(discord_id)
    )
  `);
});

module.exports = db;