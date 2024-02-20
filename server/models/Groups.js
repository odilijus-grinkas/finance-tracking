module.exports = {
  deleteGroup: async function (db, user_id, groupName) {
    try {
      await db.query(
        "DELETE FROM transaction_group WHERE users_id = ? AND group_name = ?",
        [user_id, groupName]
      );
    } catch (err) {
      console.log(err);
    }
  },
  // returns group item if it exists.
  getGroup: async function (db, users_id, group_name) {
    [group] = await db.query(
      "SELECT * FROM transaction_group WHERE users_id = ? AND group_name = ?", [users_id, group_name]
    );
    return group;
  },
  postGroup: async function (db, users_id, group_name) {
    await db.query("INSERT INTO transaction_group (users_id, group_name) VALUES (?, ?)", [users_id, group_name])
  }
};
