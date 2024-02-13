const Items = require("../models/Items");

module.exports = {
  getAllItems: async function (req, res) {
    const cashflow = req.params.cashflow;
    if (cashflow == "income" || cashflow == "expense") {
      try {
        const [income] = await Items.getByCashflow(
          req.db,
          req.params.id,
          cashflow
        );
        res.status(200).json(income);
      } catch (err) {
        console.log(err);
        res.status(500);
      }
    } else {
      // Attempts at putting a random cashflow link leads to 404
      res.status(404).json({ error: "Page not found" });
    }
  },
  postItem: async function (req, res) {
    const name = req.body.name;
    const amount = req.body.amount;
    const groupName = req.body.groupName;
    const cashflow = req.body.cashflow;
    const userId = req.body.userId;
    try {
      Items.postItem(req.db, name, amount, groupName, cashflow, userId);
      res.status(200).json({ status: "Success!" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to post item to database." });
    }
  },
};
