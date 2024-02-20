module.exports = {
  // Returns all items by user_id (INT)
  getAll: async function (db, user_id) {
    const cashflow = await db.query("SELECT * FROM items WHERE users_id = ?", [
      user_id,
    ]);
    return cashflow;
  },
  // Returns all items & groups by user_id(INT) and cashflow, which can be "income" or "expense"
  getByCashflow: async function (db, user_id, cashflow) {
    const [items] = await db.query(
      "SELECT * FROM items LEFT JOIN transaction_group ON transaction_group_id = transaction_group.id WHERE items.users_id = ? AND cashflow = ?",
      [user_id, cashflow]
      );
    return items;
  },
  // Not providing cashflow makes it return all items within date range.
  getByDate: async function (db, user_id, from, to, cashflow) {
    const query = `SELECT * FROM items WHERE users_id = ? AND date BETWEEN ? AND ?  ${
      cashflow ? "AND cashflow = ?" : ""
    }`;
    try {
      const [items] = await db.query(query, [user_id, from, to, cashflow]);
      return items;
    } catch (err) {
      return err;
    }
  },
  postItem: async function (
    db,
    name,
    amount,
    groupName,
    cashflow,
    userId,
    date
  ) {
    try {
      await db.query(
        "INSERT INTO items (name, amount, cashflow, item_group, date, users_id) VALUES (?, ?, ?, ?, ?, ?)",
        [name, amount, cashflow, groupName, date, userId]
      );
      // Likely error if number or name too big
    } catch (err) {
      console.log(err);
      console.log("error");
      return err;
    }
  },
  deleteItem: async function (db, itemId) {
    try {
      const response = await db.query("DELETE FROM items WHERE id = ?", itemId);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  updateItem: async function (db, name, amount, date, id) {

    try {
      const response = await db.query(
        "UPDATE items SET name = ?, amount = ?, date = ? WHERE id = ?",
        [name, amount, date, id]
      );
      return response;
    } catch (err) {
      console.log(err);
      return response
    }
  },
  updateGroups: async function (db, user_id, groupName, cashflow,){
    try{
      await db.query("UPDATE items SET item_group = 'ungrouped' WHERE users_id = ? AND item_group = ? AND cashflow = ?",[user_id, groupName, cashflow]);
    } catch (err){
      console.log(err)
    }
  } 
};
