const express = require("express");
const db = require("./config/mysql");
const bodyParser = require("body-parser");
const cors = require('cors');
const itemRoutes = require("./routes/ItemsApiRouter");
const userRoutes = require("./routes/UsersApiRouter");

const app = express();

const port = process.env.PORT || 3001;

// Enable CORS
app.use(cors());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });
  
// Passing database connection, so that there's only 1 open pool on the whole server
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Parse form data to make it usable
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use(userRoutes);
app.use(itemRoutes);

app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});