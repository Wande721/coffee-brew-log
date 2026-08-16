const Database = require("better-sqlite3");
const { drizzle } = require("drizzle-orm/better-sqlite3");
const schema = require("./schema");
const path = require("path");
const fs = require("fs");

// Path to the database file (same as in drizzle.config.ts)
const dbPath = path.resolve(__dirname, "../../data/sqlite.db");

// Make sure the folder exists
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");

const db = drizzle(sqlite, { schema });

module.exports = { db, sqlite };