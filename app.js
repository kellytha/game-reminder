const express = require('express');
const mysql = require('mysql2');
const app = express();
const path = require('path');
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.static(__dirname)); // Serves static files from the root directory

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nkosinabo12!',
    database: 'games',
});

// Connect to the database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// Serve the main page for adding, viewing, and editing games
app.get('/game-reminder', (req, res) => {
    res.sendFile(path.join(__dirname, 'game_reminder.html'));
});

// 1. Route to Fetch All Game Details (View Functionality)
app.get('/data', (req, res) => {
    const sql = 'SELECT * FROM games'; // Assuming the table name is 'games'
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result); // Return the game data as JSON
    });
});

// 2. Route to Add New Game Information
app.post('/add', (req, res) => {
    const { team_name, opposing_team, field_number, game_time } = req.body;
    const sql = 'INSERT INTO games (team_name, opposing_team, field_number, game_time) VALUES (?, ?, ?, ?)';

    db.query(sql, [team_name, opposing_team, field_number, game_time], (err, result) => {
        if (err) throw err;
        res.json({ success: true, message: 'Game details added successfully!' });
    });
});

// 3. Route to Edit Existing Game Details
app.put('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { team_name, opposing_team, field_number, game_time } = req.body;
    const sql = 'UPDATE games SET team_name = ?, opposing_team = ?, field_number = ?, game_time = ? WHERE id = ?';

    db.query(sql, [team_name, opposing_team, field_number, game_time, id], (err, result) => {
        if (err) throw err;
        res.json({ success: true, message: 'Game details updated successfully!', updatedGame: { id, team_name, opposing_team, field_number, game_time } });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

