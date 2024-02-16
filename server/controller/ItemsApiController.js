const Items = require("../models/Items");

module.exports = {
  getAllItemsByCashflow: async function (req, res) {
    const cashflow = req.params.cashflow;
    if (cashflow == "income" || cashflow == "expense") {
      try {
        const income = await Items.getByCashflow(
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
    const groupName = req.body.group;
    const cashflow = req.body.cashflow;
    const date = req.body.date;
    const userId = req.body.userId;
    try {
      const result = await Items.postItem(
        req.db,
        name,
        amount,
        groupName,
        cashflow,
        userId,
        date
      );
      // If error while trying to post, send error message
      if (result instanceof Error) {
        res.status(500).json({ error: "Invalid name or amount." });
        // Otherwise send success message
      } else {
        res.status(200).json({ status: "Success!" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to post item to database." });
    }
  },
  getAllItemsByCashflowAndDate: async function (req, res) {
    const cashflow = req.params.cashflow;
    const id = req.params.id;
    const from = req.params.from;
    const to = req.params.to;
    try {
      const result = await Items.getByDate(req.db, id, from, to, cashflow);
      if (result instanceof Error) {
        res.status(403).json({ error: "Data incorrect." });
      } else {
        res.status(200).json(result);
      }
    } catch (err) {
      res.status(500).json({ error: "Server Error" });
    }
  },
  deleteItem: async function (req, res) {
    const id = req.body.id;
    await Items.deleteItem(req.db, id);
    res.status(200).json({ status: "OK" });
  },
  updateItem: async function (req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const amount = req.body.amount;
    const date = req.body.date;
    try {
      await Items.updateItem(req.db, name, amount, date, id);
      res.status(200).json({ status: "OK" });
    } catch (err) {
      res.status(500).json({ error: "Server Error" });
    }
  },
  deleteGroup: async function (req, res) {
    const groupName = req.body.groupName;
    const cashflow = req.body.cashflow;
    const userId = req.body.userId;
    try {
      items = await Items.updateGroups(req.db, userId, groupName, cashflow);
      res.status(200).json({status: "OK"})

    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  },
};
