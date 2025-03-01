const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();

// User Registration
router.post("/register", (req, res) => {
    const { name, email, password, role } = req.body;
    
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ message: "Error hashing password" });

        const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
        db.query(sql, [name, email, hash, role], (error, result) => {
            if (error) return res.status(500).json({ message: "Database error" });
            res.status(201).json({ message: "User registered successfully" });
        });
    });
});

// User Login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (error, result) => {
        if (error) return res.status(500).json({ message: "Database error" });

        if (result.length === 0) return res.status(401).json({ message: "User not found" });

        bcrypt.compare(password, result[0].password, (err, isMatch) => {
            if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

            const token = jwt.sign({ id: result[0].id, role: result[0].role }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.json({ token, role: result[0].role });
        });
    });
});

module.exports = router;
