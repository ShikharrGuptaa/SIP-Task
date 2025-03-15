const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const holidayRoutes = require("./routes/holidayRoutes");
const sipRoutes = require("./routes/sipRoutes");
const app = express();

app.use(express.json());

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";
dotenv.config();
app.use(cors({
    origin: allowedOrigin,
}));

// For testing
app.get('/', (req, res) => {
    res.send("Server up and runnning")
})

app.use("/holidays", holidayRoutes);
app.use("/sip", sipRoutes);

// Removed for Vercel
// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// })

module.exports = app; 

