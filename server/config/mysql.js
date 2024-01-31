const mysql = require("mysql2/promise");

// Database connection
const db = mysql.createPool({
  connectionLimit: 50,
  waitForConnections: true,

  host: "localhost",
  user: "root",
  password: "root",
  database: "finance",
});

module.exports = db;
