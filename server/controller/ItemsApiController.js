const Items = require("../models/Items");
const Groups = require("../models/Groups");

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
    let groupName = req.body.group;
    const cashflow = req.body.cashflow;
    const date = req.body.date;
    const userId = req.body.userId;
    let group_id;
    try {
      // If groupName is "ungrouped" - assign item to "null" group.
      if (groupName.toLowerCase() === "ungrouped") {
        group_id = null;
      } else {
        const existingGroup = await Groups.getGroup(req.db, userId, groupName);
        if (existingGroup.length < 1) {
          // If group doesn't exist, create it and use its group_id for the item
          await Groups.postGroup(req.db, userId, groupName);
          const newGroup = await Groups.getGroup(req.db, userId, groupName);
          group_id = newGroup[0].group_id;
        } else {
          // If group does exist, use its id for the item
          group_id = existingGroup[0].group_id;
        }
      }
      // Posts the item
      try {
        const result = await Items.postItem(
          req.db,
          name,
          amount,
          group_id,
          cashflow,
          userId,
          date
        );
        res.status(200).json({ status: "Success!" });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Invalid name or amount." });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server error." });
    }
  },
  getAllItemsByCashflowAndDate: async function (req, res) {
    const cashflow = req.params.cashflow;
    const id = req.params.id;
    const from = req.params.from;
    const to = req.params.to;
    try {
      const result = await Items.getByDate(req.db, id, from, to, cashflow);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  },
  deleteItem: async function (req, res) {
    const id = req.body.id;
    try {
      await Items.deleteItem(req.db, id);
      res.status(200).json({ status: "OK" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
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
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  },
  deleteGroup: async function (req, res) {
    const groupName = req.body.groupName;
    const userId = req.body.userId;
    try {
      items = await Groups.deleteGroup(req.db, userId, groupName);
      res.status(200).json({ status: "OK" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  },
};
