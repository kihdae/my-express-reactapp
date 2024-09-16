// import sqlite3 from 'sqlite3';
// import { ErrorCheckDB } from '/Users/miloa/Documents/sandbox/my-express-reactapp/server/factory/ErrorCheckDB.js';
// export let user_db = new sqlite3.Database("./database/Users.db", (err) => {
//   ErrorCheckDB(err, "Users", "User Database Connection error");
//   console.log("Connected to the Users SQlite db.")
//   user_db.run(
//     `CREATE TABLE IF NOT EXISTS Users (
//       id INTEGER PRIMARY KEY,
//       username TEXT UNIQUE,
//       email TEXT UNIQUE,
//       password TEXT
//     )`,
//     (err) => {
//       ErrorCheckDB(err, "Users", "Error creating table")
//       user_db.get('SELECT COUNT(*) AS count FROM Users', (err, row) => {
//         ErrorCheckDB(err, "Profile", "Error checking table count")
//         if (row.count === 0) {
//           console.log("Users Table is ready. Inserting initial data.");
//           const insert = 'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)';
//           const hashedPassword1 = bcrypt.hashSync('password1', 10);
//           const hashedPassword2 = bcrypt.hashSync('password2', 10);
//           user_db.run(insert, ['user1', "Bruh@gmail.com", hashedPassword1]);
//           user_db.run(insert, ['user2', "ifarted@farted.com", hashedPassword2]);
//         }
//       })
//     }
//   )
// })