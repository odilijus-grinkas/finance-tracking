const express = require("express");
const CashflowApiController = require("../controller/ItemsApiController");

const router = express.Router();

router.get("/:cashflow/:id", CashflowApiController.getAllItems);

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
