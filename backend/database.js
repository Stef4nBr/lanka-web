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
            json TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        );
        `);

  // Insert admin user
  db.run(`
        INSERT OR IGNORE INTO users (name, email, password)
        VALUES ('admin', 'admin@example.com', 'password');
    `);
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

function insertContent(user_id, json) {
  return new Promise((resolve, reject) => {
    // Use INSERT OR REPLACE to overwrite existing record for the user_id
    db.run(
      `INSERT INTO content (user_id, json, updated_at) 
       VALUES (?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(user_id) 
       DO UPDATE SET json = excluded.json, updated_at = CURRENT_TIMESTAMP`,
      [user_id, json],
      function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, user_id, json });
      }
    );
  });
}

function loadContent(user_id) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM content WHERE user_id = ?",
      [user_id],
      (err, row) => {
        if (err) return reject(err);
        
        // If no content found for specific user, get all content
        if (!row) {
          db.all(
            "SELECT * FROM content",
            [],
            (err, rows) => {
              if (err) return reject(err);
              resolve(rows);
            }
          );
        } else {
          resolve(row);
        }
      }
    );
  });
}

module.exports = { db, getRecords, insertContent, loadContent };
