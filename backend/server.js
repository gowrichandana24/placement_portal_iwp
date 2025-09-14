const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // your MySQL username
  password: 'Gowri@24', // your MySQL password
  database: 'placements_db'
});

db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

// Save interested student
app.post('/interested', (req, res) => {
  const { name, regno, email, contact, course, sem, overall_cgpa } = req.body;
  const sql = `INSERT INTO interested_students (name, regno, email, contact, course, sem, overall_cgpa) VALUES (?,?,?,?,?,?,?)`;
  db.query(sql, [name, regno, email, contact, course, sem, overall_cgpa], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

// Save not-interested student
app.post('/not-interested', (req, res) => {
  const { regno, reason } = req.body;
  const sql = `INSERT INTO not_interested (regno, reason) VALUES (?,?)`;
  db.query(sql, [regno, reason], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

// Fetch all interested students
app.get("/admin/interested", (req, res) => {
  db.query("SELECT * FROM interested_students", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Fetch all not-interested students
app.get("/admin/not-interested", (req, res) => {
  db.query("SELECT * FROM not_interested", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.listen(4000, () => console.log('✅ Server running on http://localhost:4000'));
