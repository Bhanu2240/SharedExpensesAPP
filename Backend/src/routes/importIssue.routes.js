const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");

const {
  getImportIssues,
  updateIssueStatus,
} = require("../controllers/importIssue.controller");

router.get("/", protect, getImportIssues);

router.patch(
  "/:id",
  protect,
  updateIssueStatus
);

module.exports = router;