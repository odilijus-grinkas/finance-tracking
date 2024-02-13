const express = require("express");
const UsersApiController = require("../controller/UsersApiController");

const router = express.Router();

router.post("/login", UsersApiController.login);

router.post("/signup", (req, res) => {
  res.status(200).json({nice:'good'})
});

router.delete("/users", (req, res) => {
  // model
});

router.put("/users/:id", (req, res) => {
  // model
});

module.exports = router;
