const Users = require("../models/Users");
const bcryptjs = require("bcryptjs");

module.exports = {
  // reads email & password, checks if DB matches them, sends json with id if yes, errors if no
  login: async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    try {
      const userData = await Users.login(req.db, email);
      if (!userData) {
        res.status(403).json({error: "User does not exist."});
      } else {
        const correctPass = await bcryptjs.compare(
          password,
          userData.password_hash
          );
          if (correctPass) {
          res.status(200).json({ id: userData.id }); // 👈👈👈👈👈👈👈👈👈👈 probably should be a token instead of sending json
        } else {
          res.status(403).json({error: "Wrong password."});
        }
      }
    } catch (err) {
      console.log("Is the database running?");
      console.log(err);
      res.status(500).json({error: "Database failed to get data"});
    }
  },
};
