const { hash } = require("bcryptjs");

module.exports = {
  // takes email, returns {password_hash: val, id: val} or flase
  login: async function (db, email) {
    try {
      [response] = await db.query(
        "SELECT password_hash, id FROM users WHERE email = ?",
        [email]
      );
      if (response.length < 1) {
        return false;
      } else {
        return response[0];
      }
    } catch (err) {
      return false;
    }
  },
  // takes email & password and attempts to store
  signup: async function (db, email, password_hash) {
    try {
      await db.query("INSERT INTO users (email, password_hash) VALUES (?,?)", [
        email,
        password_hash,
      ]);
    } catch (err) {
      return 
    }
  },
  delete: async function (db, userId) {
    try{
      await db.query("DELETE FROM users WHERE id = ?",[userId]);
    } catch (err){
      return err
    }
  }
};
