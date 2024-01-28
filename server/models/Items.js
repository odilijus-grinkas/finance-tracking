module.exports = {
  // Returns all items by user_id (INT)
  getAll: async (db, user_id) => {
    const cashflow = await db.query(
      "SELECT * FROM items WHERE users_id = ?",
      [user_id]
    );
    return cashflow;
  },
  // Returns all items by user_id(INT) and cashflow, which can be "income" or "expense"
  getByCashflow: async (db, user_id, cashflow) => {
    const items = await db.query(
      "SELECT * FROM items WHERE users_id = ? AND cashflow = ?",
      [user_id, cashflow]
    );
    return items;
  },
};
