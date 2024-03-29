const express = require("express");
const UsersApiController = require("../controller/UsersApiController");

const router = express.Router();

router.post("/login", UsersApiController.login);

router.post("/signup", UsersApiController.signup);

router.delete("/users", UsersApiController.delete);

router.post("/pass_reset", UsersApiController.sendEmail);

router.get("/token/:token", UsersApiController.testToken );

router.put("/users", UsersApiController.changePassword);
module.exports = router;
