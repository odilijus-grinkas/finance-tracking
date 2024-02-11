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
      // attempts to put random cashflow links leads to 404
      res.status(404).json({error: "Page not found"});
    }
  },
};
