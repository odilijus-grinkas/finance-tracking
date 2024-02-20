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
  getGroup: async function (db, users_id, group_name) {
    [group] = await db.query(
      "SELECT * FROM transaction_group WHERE users_id = ? AND group_name = ?", [users_id, group_name]
    );
    return group;
  },
};
