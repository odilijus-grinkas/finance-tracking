const express = require("express");
const CashflowApiController = require("../controller/ItemsApiController");

const router = express.Router();
// Returns items based on cashflow (income/expense)
router.get("/:cashflow/:id", CashflowApiController.getAllItems);
// Posts 1 item
router.post("/item", CashflowApiController.postItem);

router.delete("/item", (req, res) => {
  // controller
});

router.put("/item/:id", (req, res) => {
  // controller
});

module.exports = router;
