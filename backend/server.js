const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5500;  // Use one port

// MySQL connection (using one DB, e.g., 'placements_db')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ashwini',  // Use one correct password
    database: 'Students'
});

db.connect(err => {
    if (err) {
        console.error("❌ Database connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL database");
    }
});

// 1️⃣ Student login route
app.post('/student/login', (req, res) => {
    const { studentId, password } = req.body;

    if (!studentId || !password) {
        return res.status(400).json({ message: 'Student ID and password required.' });
    }

    const query = 'SELECT student_name, course, batch FROM students WHERE student_id = ? AND password = ?';
    db.query(query, [studentId, password], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', err });

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid Student ID or Password' });
        }

        res.json({
            message: 'Login successful',
            student: results[0]
        });
    });
});

// 2️⃣ Save interested student
app.post('/interested', (req, res) => {
    const { name, regno, email, contact, course, sem, overall_cgpa } = req.body;
    const sql = `INSERT INTO interested_students (name, regno, email, contact, course, sem, overall_cgpa) VALUES (?,?,?,?,?,?,?)`;
    db.query(sql, [name, regno, email, contact, course, sem, overall_cgpa], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ success: true });
    });
});

// 3️⃣ Save not-interested student
app.post('/not-interested', (req, res) => {
    const { regno, reason } = req.body;
    const sql = `INSERT INTO not_interested (regno, reason) VALUES (?,?)`;
    db.query(sql, [regno, reason], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ success: true });
    });
});

// 4️⃣ Fetch interested students (for admin)
app.get("/admin/interested", (req, res) => {
    db.query("SELECT * FROM interested_students", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// 5️⃣ Fetch not-interested students (for admin)
app.get("/admin/not-interested", (req, res) => {
    db.query("SELECT * FROM not_interested", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Start single server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
