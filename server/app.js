const express = require("express");
const db = require("./config/mysql");
const itemRoutes = require("./routes/ItemsApiRouter");

const app = express();

const port = process.env.PORT || 3001;

// Passing database connection, so that there's only 1 open pool on the whole server
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
app.use(itemRoutes);

app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});