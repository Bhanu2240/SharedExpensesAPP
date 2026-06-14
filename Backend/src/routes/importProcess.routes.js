const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");

const {
  processImport,
    resetImportData,
} = require("../controllers/importProcess.controller");

router.post(
  "/process",
  protect,
  processImport
);
router.post(
  "/reset",
  protect,
  resetImportData
);

module.exports = router;