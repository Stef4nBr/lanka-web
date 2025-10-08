const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

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

    // Insert admin user
    db.run(`
        INSERT OR IGNORE INTO users (name, email, password)
        VALUES ('admin', 'admin@example.com', 'password');
    `);
});


// Wrapping db.get in a Promise to use await
function getRecords(username, password) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE name = ? AND password = ?', [username, password], (err, row) => {
            if (err) return reject(err);
            console.log(username, row)
            resolve(row);
        });
    });

}

module.exports = { db, getRecords };
