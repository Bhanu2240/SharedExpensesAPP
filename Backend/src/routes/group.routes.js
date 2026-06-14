const express = require("express");

const {
  createGroup,
  getMyGroups,
    addMember,
    getGroupMembers,
    getBalances,
    getSettlements,
    updateMemberTimeline,
} = require("../controllers/group.controller");

const protect = require("../middlewares/auth.middleware");

const router = express.Router();

// Create Group
router.post("/", protect, createGroup);

// Get My Groups
router.get("/", protect, getMyGroups);

// Add Member to Group
router.post("/:groupId/members", protect, addMember);

// Get Group Members
router.get("/:groupId/members", protect, getGroupMembers);

router.get("/:groupId/balances", protect,getBalances);
router.get( "/:groupId/settlements",protect,getSettlements);
router.put( "/member/:memberId",  protect,updateMemberTimeline);

module.exports = router;