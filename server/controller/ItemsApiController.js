const Items = require("../models/Items");

module.exports = {
  // Returns all items
  getAllItems: async (req, res) => {
    // this will take id from token or something later
    let user_id = 1;
    try {
      const [items] = await Items.getAll(req.db, user_id);
      res.status(200).json(items);
    } catch (err) {
      console.log(err);
      // res.status(500).json({ status: "failed", data: "Server Error" });
      res.status(500);
    }
  },
  // Return all income items
  getAllIncome: async (req, res) => {
    let user_id = 1;
    try {
      const [income] = await Items.getByCashflow(req.db, user_id, "income");
      res.status(200).json(income);
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  },
  // Return all expense items
  getAllExpense: async (req, res) => {
    let user_id = 1;
    try {
      const [expense] = await Items.getByCashflow(req.db, user_id, "expense");
      res.status(200).json(expense);
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  },
};
