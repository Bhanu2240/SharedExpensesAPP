const express = require("express");

const {
  createExpense,
  getGroupExpenses,
} = require("../controllers/expense.controller");

const protect = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", protect, createExpense);

router.get(
  "/group/:groupId",
  protect,
  getGroupExpenses
);

module.exports = router;