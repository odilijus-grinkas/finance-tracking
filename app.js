const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

const port = process.env.PORT || 3000;

// Database connection
const con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "finance",
})

// Placeholder
app.get('/', (req,res)=>{
  res.sendStatus(200);
})

app.listen(port, ()=>{
  console.log(`Server listening on: http://localhost:${port}`);
});