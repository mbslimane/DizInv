

const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "SOLA25",
  database: "dizinv",
});

// const db = mysql.createPool({
//   host: "192.168.137.86",
//   user: "malak",
//   password: "12345678",
//   database: "dizinv",
// });

module.exports = db;