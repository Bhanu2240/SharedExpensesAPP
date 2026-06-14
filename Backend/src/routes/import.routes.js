const express = require("express");
const multer = require("multer");

const {
  importCsv,
} = require("../controllers/import.controller");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post(
  "/csv",
  upload.single("file"),
  importCsv
);

module.exports = router;