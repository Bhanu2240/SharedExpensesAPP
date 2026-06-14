const express = require("express");

const {
  createExpense,
  getGroupExpenses,
   getAllExpenses,
  getExpenseById,
   updateExpense,
  deleteExpense,
} = require("../controllers/expense.controller");

const protect = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", protect, createExpense);

router.get( "/group/:groupId",protect, getGroupExpenses
);
router.get("/", protect, getAllExpenses);

router.get("/:id", protect, getExpenseById);
router.put("/:id", protect, updateExpense);

router.delete("/:id", protect, deleteExpense);

module.exports = router;