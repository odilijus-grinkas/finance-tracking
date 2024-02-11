const mysql = require("mysql2/promise");

const {
  MYSQL_HOST: HOST,
  MYSQL_USER: USER,
  MYSQL_PASSWORD: PASSWORD,
  MYSQL_DATABASE: DB,
} = process.env;
// console.log([HOST,USER,PASSWORD,DB])

// Database connection
const db = mysql.createPool({
  connectionLimit: 50,
  waitForConnections: true,

  host: "localhost",
  user: "root",
  password: "root",
  database: "finance",
  // host: HOST,
  // user: USER,
  // password: PASSWORD,
  // database: DB,
});

module.exports = db;
