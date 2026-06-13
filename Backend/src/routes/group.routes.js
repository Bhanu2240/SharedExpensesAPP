const express = require("express");

const {
  createGroup,
  getMyGroups,
} = require("../controllers/group.controller");

const protect = require("../middlewares/auth.middleware");

const router = express.Router();

// Create Group
router.post("/", protect, createGroup);

// Get My Groups
router.get("/", protect, getMyGroups);

module.exports = router;