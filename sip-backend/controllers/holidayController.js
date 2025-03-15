const prisma = require("../config/prismaclient");

// Controller to add all Holidays in the db
// I'll be taking dates in array format, so that multiple dates can be added at once

const addHolidays = async (req, res) => {
  try {
    const { holidays } = req.body;

    // Cheking for crrct frmat of date
    if (!holidays || !Array.isArray(holidays) || holidays.length === 0) {
      return res.status(400).json({ message: "Invalid Format" });
    }

    const createdHolidays = await prisma.holiday.createMany({
      data: holidays.map((date) => ({ date: new Date(date) })),
      skipDuplicates: true,
    });

    res.status(201).json({
      message: "Holidays added successfully",
      count: createdHolidays.count,
    });
  } catch (err) {
    console.error("Error adding holidays", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { addHolidays };
