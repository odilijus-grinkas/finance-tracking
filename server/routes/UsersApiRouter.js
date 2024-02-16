const express = require("express");
const UsersApiController = require("../controller/UsersApiController");

const router = express.Router();

router.post("/login", UsersApiController.login);

router.post("/signup", UsersApiController.signup);

router.delete("/users", UsersApiController.delete);

router.post("/pass_reset", UsersApiController.sendEmail);

router.put("/users/:id", (req, res) => {
  // model
});
module.exports = router;
