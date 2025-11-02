require('dotenv').config();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./data.db");

db.serialize(() => {
  // Drop the users table if it exists
  db.run(`DROP TABLE IF EXISTS users`);

  // Create the users table
  db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        );
        `);
  db.run(`
        CREATE TABLE IF NOT EXISTS content (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL UNIQUE,
            mdxContent TEXT,
            fabricContent TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        );
        `);

  // Insert admin user from environment variables
  db.run(`
        INSERT OR IGNORE INTO users (name, email, password)
        VALUES (?, ?, ?);
    `, [process.env.ADMIN_USERNAME, process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD]);
});

// Wrapping db.get in a Promise to use await
function getRecords(username, password) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM users WHERE name = ? AND password = ?",
      [username, password],
      (err, row) => {
        if (err) return reject(err);
        console.log(username, row);
        resolve(row);
      }
    );
  });
}

function insertContent({ user_id, mdxContent, fabricContent }) {
  return new Promise((resolve, reject) => {
    // Use INSERT with ON CONFLICT to handle UPSERT
    // Only update fields that are not null to preserve existing data
    db.run(
      `INSERT INTO content (user_id, mdxContent, fabricContent, updated_at) 
       VALUES (?, ?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(user_id) 
       DO UPDATE SET 
         mdxContent = CASE WHEN excluded.mdxContent IS NOT NULL THEN excluded.mdxContent ELSE mdxContent END,
         fabricContent = CASE WHEN excluded.fabricContent IS NOT NULL THEN excluded.fabricContent ELSE fabricContent END,
         updated_at = CURRENT_TIMESTAMP`,
      [user_id, mdxContent || null, fabricContent || null],
      function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, user_id, mdxContent, fabricContent });
      }
    );
  });
}

function loadContent(user_id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM content WHERE user_id = ?", [user_id], (err, row) => {
      if (err) return reject(err);

      // If no content found for specific user, get all content
      if (!row) {
        db.all("SELECT * FROM content", [], (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        });
      } else {
        resolve(row);
      }
    });
  });
}

module.exports = { db, getRecords, insertContent, loadContent };
