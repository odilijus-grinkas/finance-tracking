module.exports = {
  // takes email, returns {password_hash: val, id: val} or flase
  login: async function (db, email) {
    [response] = await db.query("SELECT password_hash, id FROM users WHERE email = ?", [email]);
    if (response.length < 1){
      return false;
    } else {
      return response[0];
    }
  },
};
