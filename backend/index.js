const express = require("express");
require("dotenv").config();
const db = require("./models/dbSchema");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Healthcare Management System API is running...");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
