const express = require("express");
const CashflowApiController = require("../controller/ItemsApiController");

const router = express.Router();

router.get("/items", (req, res) => {
  CashflowApiController.getAllItems(req, res);
});
router.get("/income", (req, res) => {
  CashflowApiController.getAllIncome(req, res);
});
router.get("/expense", (req, res) => {
  CashflowApiController.getAllExpense(req, res);
});

router.post("/item", (req, res) => {
  // controller
});

router.delete("/item", (req, res) => {
  // controller
});

router.put("/item/:id", (req, res) => {
  // controller
});

module.exports = router;
