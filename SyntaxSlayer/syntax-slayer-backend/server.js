const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS to allow communication with your frontend
app.use(cors());
app.use(express.json());

// Connect to SQLite database
const dbPath = process.env.DB_PATH || path.join(__dirname, 'leaderboard.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Database connection error:', err);
  else console.log('Connected to SQLite database at:', dbPath);
});

// Create leaderboard table
db.run(`
  CREATE TABLE IF NOT EXISTS leaderboard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    score INTEGER,
    mode TEXT,
    difficulty TEXT,
    date TEXT
  )
`);

// Endpoint to save a score
app.post('/save-score', (req, res) => {
  const { name, score, mode, difficulty, date, transactionId } = req.body;

  // Validate inputs
  if (!mode || !['standard', 'endless', 'timed'].includes(mode)) {
    console.error('Invalid mode:', mode);
    return res.status(400).send('Invalid mode');
  }
  if (typeof score !== 'number' || score < 0) {
    console.error('Invalid score:', score);
    return res.status(400).send('Invalid score');
  }
  const validDifficulties = mode === 'timed' ? ['30', '60', '90'] : ['easy', 'medium', 'hard'];
  if (!difficulty || !validDifficulties.includes(difficulty)) {
    console.error('Invalid difficulty:', difficulty, 'for mode:', mode);
    return res.status(400).send(`Invalid difficulty for mode ${mode}`);
  }

  db.run(
    `INSERT INTO leaderboard (name, score, mode, difficulty, date) VALUES (?, ?, ?, ?, ?)`,
    [name || 'Anonymous', score, mode, difficulty, date || new Date().toISOString()],
    (err) => {
      if (err) {
        console.error('Error saving score:', err);
        res.status(500).send('Error saving score');
      } else {
        console.log(`Score saved: name=${name}, score=${score}, mode=${mode}, difficulty=${difficulty}, transactionId=${transactionId}`);
        res.status(200).send('Score saved');
      }
    }
  );
});

// Endpoint to retrieve leaderboard
app.get('/leaderboard/:mode', (req, res) => {
  const mode = req.params.mode;
  if (!['standard', 'endless', 'timed'].includes(mode)) {
    console.error('Invalid mode requested:', mode);
    return res.status(400).send('Invalid mode');
  }
  db.all(
    `SELECT name, score, mode, difficulty, date FROM leaderboard WHERE mode = ? ORDER BY score DESC LIMIT 10`,
    [mode],
    (err, rows) => {
      if (err) {
        console.error('Error fetching leaderboard:', err);
        res.status(500).send('Error fetching leaderboard');
      } else {
        res.json(rows);
      }
    }
  );
});

// Endpoint to clear leaderboard
app.delete('/clear-leaderboard', (req, res) => {
  db.run(`DELETE FROM leaderboard`, (err) => {
    if (err) {
      console.error('Error clearing leaderboard:', err);
      res.status(500).send('Error clearing leaderboard');
    } else {
      console.log('Leaderboard cleared');
      res.status(200).send('Leaderboard cleared');
    }
  });
});

app.listen(port, () => {
  c

module.exports = app;onsole.log(`Server running at http://localhost:${port}`);
});