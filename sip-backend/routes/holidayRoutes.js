const express = require("express");
const router = express.Router();
const { addHolidays } = require("../controllers/holidayController");

router.post('/add', addHolidays);

module.exports = router;

