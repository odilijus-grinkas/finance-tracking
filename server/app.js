const express = require("express");
const db = require("./config/mysql");
const itemRoutes = require("./routes/ItemsApiRouter");

const app = express();

const port = process.env.PORT || 3001;

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Passing database connection, so that there's only 1 open pool on the whole server
app.use((req, res, next) => {
  req.db = db;
  next();
});
//assasdasdasdasdasdasdhtfhf
// Routes
app.use(itemRoutes);

app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});