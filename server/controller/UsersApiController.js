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
        res.status(403).json({ error: "User does not exist." });
      } else {
        const correctPass = await bcryptjs.compare(
          password,
          userData.password_hash
        );
        if (correctPass) {
          res.status(200).json({ id: userData.id }); // 👈👈👈👈👈👈👈👈👈👈 probably should be a token instead of sending json
        } else {
          res.status(403).json({ error: "Wrong password." });
        }
      }
    } catch (err) {
      console.log("Is the database running?");
      console.log(err);
      res.status(500).json({ error: "Database failed to get data" });
    }
  },
  // attempts to sign up user if no duplicate email
  signup: async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const password_hash = await bcryptjs.hash(password, 10);

    const result = await Users.signup(req.db, email, password_hash);
    // If error, send appropriate message, otherwise send "success" status
    if (result instanceof Error) {
      if (result.message.includes("Duplicate entry")) {
        res.status(403).json({ error: "Email already in use" });
      } else {
        res.status(500).json({ error: "Server error." });
      }
    } else {
      res.status(200).json({ status: "Success" });
    }
  },
  // Removes user based on email
  delete: async function (req, res) {
    const userId = req.body.userId;
    const result = await Users.delete(req.db, userId);
    if (result instanceof Error) {
      res.status(500).json({ error: "Server error." });
    } else {
      res.status(200).json({ status: "Success" });
    }
  },
};
