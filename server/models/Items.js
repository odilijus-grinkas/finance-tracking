module.exports = {
  // Returns all items by user_id (INT)
  getAll: async function (db, user_id) {
    const cashflow = await db.query("SELECT * FROM items WHERE users_id = ?", [
      user_id,
    ]);
    return cashflow;
  },
  // Returns all items by user_id(INT) and cashflow, which can be "income" or "expense"
  getByCashflow: async function (db, user_id, cashflow) {
    const items = await db.query(
      "SELECT * FROM items WHERE users_id = ? AND cashflow = ?",
      [user_id, cashflow]
    );
    return items;
  },
  postItem: async function (db, name, amount, groupName, cashflow, userId) {
    await db.query(
      "INSERT INTO items (name, amount, cashflow, item_group, date, users_id) VALUES (?, ?, ?, ?, CURDATE(), ?)",
      [name, amount, cashflow, groupName, userId]
    );
  },
};
