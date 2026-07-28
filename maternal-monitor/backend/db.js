const initSqlJs = require("sql.js");
const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "maternal.db");

let db;

async function getDb() {
  if (db) return db;
  const SQL = await initSqlJs();
  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS mothers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER,
      lmp_date TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS milestones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mother_id INTEGER,
      week INTEGER,
      category TEXT,
      description TEXT,
      status TEXT DEFAULT 'pending',
      recorded_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY(mother_id) REFERENCES mothers(id)
    );
    CREATE TABLE IF NOT EXISTS ai_insights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mother_id INTEGER,
      week INTEGER,
      insight TEXT,
      risk_level TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY(mother_id) REFERENCES mothers(id)
    );
  `);
  save();
  return db;
}

function save() {
  if (!db) return;
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

function run(sql, params = []) {
  db.run(sql, params);
  // get last inserted id as a plain number
  const result = db.exec("SELECT last_insert_rowid() as id");
  const lastId = result[0] ? Number(result[0].values[0][0]) : 0;
  save();
  return { lastInsertRowid: lastId };
}

function all(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    const row = stmt.getAsObject();
    // convert any BigInt to Number
    Object.keys(row).forEach((k) => {
      if (typeof row[k] === "bigint") row[k] = Number(row[k]);
    });
    rows.push(row);
  }
  stmt.free();
  return rows;
}

function get(sql, params = []) {
  return all(sql, params)[0] || null;
}

module.exports = { getDb, run, all, get, save };
