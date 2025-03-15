const prisma = require("../config/prismaclient");

// Controller to get Next Instalmet Date

const isNotValid = (date, allHolidays) => {
  const day = date.getDay();
  if (day === 0 || day === 6) return true;

  return allHolidays.has(date.toISOString().split("T")[0]);
};

const getNextSIPDate = async (req, res) => {
  try {
    const { startDate, frequency, referenceDate } = req.query;
    if (!startDate || !frequency || !referenceDate) {
      return res.status(400).json({ message: "Missing fields" });
    }
    let freq = frequency.toLowerCase();
    let next_date = new Date(startDate);
    let ref_date = new Date(referenceDate);

    const allHolidays = new Set(
      (await prisma.holiday.findMany()).map(
        (h) => h.date.toISOString().split("T")[0]
      )
    );

    while (next_date <= ref_date) {
      if (freq == "weekly") next_date.setDate(next_date.getDate() + 7);
      else if (freq == "monthly") next_date.setMonth(next_date.getMonth() + 1);
      else if (freq == "yearly")
        next_date.setFullYear(next_date.getFullYear() + 1);
      else return res.status(400).json({ message: "Invalid frequency" });
    }

    while (isNotValid(next_date, allHolidays)) {
      next_date.setDate(next_date.getDate() + 1);
    }

    return res
      .status(200)
      .json({ next_SIP_Date: next_date.toISOString().split("T")[0] });
  } catch (err) {
    console.error("Error getting next SIP date", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getinstalment_date = async (req, res) => {
  try {
    const { startDate, frequency, transactionDate } = req.query;
    if (!startDate || !frequency || !transactionDate) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const allHolidays = new Set(
      (await prisma.holiday.findMany()).map(
        (h) => h.date.toISOString().split("T")[0]
      )
    );

    let freq = frequency.toLowerCase();
    let instalment_date = new Date(startDate);
    let txn_date = new Date(transactionDate);

    while (instalment_date < txn_date) {
      if (freq == "weekly")
        instalment_date.setDate(instalment_date.getDate() + 7);
      else if (freq == "monthly")
        instalment_date.setMonth(instalment_date.getMonth() + 1);
      else if (freq == "yearly")
        instalment_date.setFullYear(instalment_date.getFullYear() + 1);
      else return res.status(400).json({ message: "Invalid frequency" });
    }

    if (instalment_date > txn_date) {
      if (frequency === "weekly")
        instalment_date.setDate(instalment_date.getDate() - 7);
      else if (frequency === "monthly")
        instalment_date.setMonth(instalment_date.getMonth() - 1);
      else if (frequency === "yearly")
        instalment_date.setFullYear(instalment_date.getFullYear() - 1);
    }

    const original_instalment_date = new Date(instalment_date);

    while (isNotValid(instalment_date, allHolidays)) {
      instalment_date.setDate(instalment_date.getDate() + 1);
    }

    return res.json({
      original_instalment_date: original_instalment_date.toISOString().split("T")[0],
      adjustedTransactionDate: instalment_date.toISOString().split("T")[0],
    });
  } catch (err) {
    console.error("Error getting next SIP date", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getNextSIPDate, getinstalment_date };
