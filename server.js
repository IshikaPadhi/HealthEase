require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ishika@123',
    database: 'HealthEase'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL Workbench database');
    }
});

// Sample Route
app.get('/', (req, res) => {
    res.send('Welcome to Healthcare Management API');
});

// Start Server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
