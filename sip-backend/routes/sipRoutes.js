const express = require("express");
const {
  getNextSIPDate,
  getinstalment_date,
} = require("../controllers/sipController");
const router = express.Router();

router.get("/next-instalment", getNextSIPDate);
router.get("/get-instalment-date", getinstalment_date);

module.exports = router;
