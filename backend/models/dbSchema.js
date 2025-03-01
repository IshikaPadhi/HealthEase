const db = require("../config/db");

// Create Users Table
const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('patient', 'doctor', 'admin') DEFAULT 'patient',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

// Create Hospitals Table
const createHospitalsTable = `
    CREATE TABLE IF NOT EXISTS hospitals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        contact VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

// Create Appointments Table
const createAppointmentsTable = `
    CREATE TABLE IF NOT EXISTS appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        hospital_id INT NOT NULL,
        appointment_date DATETIME NOT NULL,
        status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE
    );
`;

// Create Health Records Table
const createHealthRecordsTable = `
    CREATE TABLE IF NOT EXISTS health_records (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        hospital_id INT NOT NULL,
        diagnosis TEXT NOT NULL,
        prescription TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE
    );
`;

// Execute the queries
db.query(createUsersTable, (err, result) => {
    if (err) console.error(err);
    else console.log("Users Table Ready");
});

db.query(createHospitalsTable, (err, result) => {
    if (err) console.error(err);
    else console.log("Hospitals Table Ready");
});

db.query(createAppointmentsTable, (err, result) => {
    if (err) console.error(err);
    else console.log("Appointments Table Ready");
});

db.query(createHealthRecordsTable, (err, result) => {
    if (err) console.error(err);
    else console.log("Health Records Table Ready");
});

module.exports = db;
