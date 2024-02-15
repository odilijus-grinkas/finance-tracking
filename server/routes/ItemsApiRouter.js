const express = require("express");
const CashflowApiController = require("../controller/ItemsApiController");

const router = express.Router();
// Returns items based on cashflow (income/expense)
router.get("/:cashflow/:id", CashflowApiController.getAllItemsByCashflow);
// Returns items based on cashflow & date range
router.get("/:cashflow/:id/:from/:to", CashflowApiController.getAllItemsByCashflowAndDate);
// Returns items based on date range
router.get("/:id/:from/:to", CashflowApiController.getAllItemsByCashflowAndDate)
// Posts 1 item
router.post("/item", CashflowApiController.postItem);

router.delete("/item", CashflowApiController.deleteItem);

router.put("/item/", CashflowApiController.updateItem);
// Delete group & leave its items ungrouped
router.delete("/group", CashflowApiController.deleteGroup);

module.exports = router;
