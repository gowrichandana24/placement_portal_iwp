const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5500;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '-----',  
    database: 'Students'   
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("yayayyyy!!!!!!!Connected to MySQL database");
    }
});

// Student login route
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

// Fetch interested students (for admin)
app.get("/admin/interested", (req, res) => {
    db.query("SELECT * FROM interested_students", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Fetch not-interested students (for admin)
app.get("/admin/not-interested", (req, res) => {
    db.query("SELECT * FROM not_interested", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Post Notification
app.post('/admin/notifications', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });
    const sql = `INSERT INTO notifications (title, content, created_at) VALUES (?, ?, NOW())`;
    db.query(sql, [title, content], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ id: result.insertId, title, content });
    });
});

// Post Announcement
app.post('/admin/announcements', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });
    const sql = `INSERT INTO announcements (title, content, created_at) VALUES (?, ?, NOW())`;
    db.query(sql, [title, content], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ id: result.insertId, title, content });
    });
});

//  Post Drive
app.post('/admin/drives', (req, res) => {
    const { company, jobTitle, driveDate, lastRegisterDate } = req.body;
    if (!company || !jobTitle || !driveDate || !lastRegisterDate)
        return res.status(400).json({ error: 'All fields are required' });
    const sql = `INSERT INTO drives (company, job_title, drive_date, last_register_date, created_at) VALUES (?, ?, ?, ?, NOW())`;
    db.query(sql, [company, jobTitle, driveDate, lastRegisterDate], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ id: result.insertId, company, jobTitle, driveDate, lastRegisterDate });
    });
});

// Post Calendar Event
app.post('/admin/calendar', (req, res) => {
    const { eventTitle, eventDate, eventTime } = req.body;
    if (!eventTitle || !eventDate) return res.status(400).json({ error: 'Event title and date are required' });
    const sql = `INSERT INTO calendar_events (title, date, time, created_at) VALUES (?, ?, ?, NOW())`;
    db.query(sql, [eventTitle, eventDate, eventTime || null], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ id: result.insertId, eventTitle, eventDate, eventTime });
    });
});

// --- NEW: GET endpoints to serve student dashboard data ---

// GET notifications (latest 10)
app.get('/admin/notifications', (req, res) => {
    const sql = 'SELECT * FROM notifications ORDER BY created_at DESC LIMIT 10';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// GET announcements (latest 10)
app.get('/admin/announcements', (req, res) => {
    const sql = 'SELECT * FROM announcements ORDER BY created_at DESC LIMIT 10';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// GET upcoming drives (next 10)
app.get('/admin/drives', (req, res) => {
    const sql = 'SELECT * FROM drives ORDER BY drive_date ASC LIMIT 10';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// GET calendar events
app.get('/admin/calendar', (req, res) => {
    const sql = 'SELECT * FROM calendar_events ORDER BY date ASC';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));