const express = require("express");
const UsersApiController = require("../controller/UsersApiController");

const router = express.Router();

router.post("/login", UsersApiController.login);

router.post("/signup", (req, res) => {
  // model
});

router.delete("/users", (req, res) => {
  // model
});

router.put("/users/:id", (req, res) => {
  // model
});

module.exports = router;
