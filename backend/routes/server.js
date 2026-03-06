const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const PORT = 3006;

app.use(bodyParser.json());
// Connect sa MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // default sa XAMPP
    password: '',       // usually blank sa XAMPP
    database: 'jomar'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database!');
});

// POST route para mag-add ng user
app.get('/', (req, res) => {
    const { id, username, email, phone } = req.body;

    if (!id || !username || !email || !phone) {
        return res.status(400).json({ message: "Lahat ng fields ay required!" });
    }

    const sql = 'INSERT INTO register (id, username, email, phone) VALUES (?, ?, ?, ?)';
    db.query(sql, [id, username, email, phone], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error sa database', error: err });
        }
        res.status(201).json({ message: 'User added successfully', user: { id, username, email, phone } });
    });
});

// GET route para makita lahat ng users
app.get('/users', (req, res) => {
    db.query('SELECT * FROM register', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error sa database', error: err });
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});