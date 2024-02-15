const mysql = require("mysql2/promise");

let {
  MYSQL_HOST: HOST,
  MYSQL_USER: USER,
  MYSQL_PASSWORD: PASSWORD,
  MYSQL_DATABASE: DB,
} = process.env;
// If DB container is not connected, pass these values to mySql instead.
if (!HOST){
  HOST = "localhost";
  USER = "root";
  PASSWORD = "root";
  DB = "finance";
};

console.log(HOST)
// Database connection
const db = mysql.createPool({
  connectionLimit: 50,
  waitForConnections: true,

  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DB,
});

module.exports = db;
