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
      return;
    }
  },
  delete: async function (db, userId) {
    try {
      await db.query("DELETE FROM users WHERE id = ?", [userId]);
    } catch (err) {
      return err;
    }
  },
  getIdFromEmail: function (db, email) {
    return db.query("SELECT id FROM users WHERE email = ?", [email]);
  },
  addToken: function (db, token, userId){
    db.query("INSERT INTO tokens (token, users_id, created) VALUES (?, ?, CURDATE())", [token, userId]);
  },
  getToken : function (db, token){
    return db.query("SELECT * FROM tokens WHERE token = ?", [token]);
  },
  removeToken : function (db, token){
    db.query("DELETE FROM tokens WHERE token = ?", [token])
  },
  changePass: function (db, userId, password_hash) {
    db.query("UPDATE users SET password_hash = ? WHERE id = ?", [password_hash, userId]);
  },
};
