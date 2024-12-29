const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword', // Replace with your MySQL password
  database: 'notes_db',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

// API Routes
app.get('/notes', (req, res) => {
  db.query('SELECT * FROM notes', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  db.query(
    'INSERT INTO notes (title, content) VALUES (?, ?)',
    [title, content],
    (err, result) => {
      if (err) throw err;
      res.send({ id: result.insertId, title, content });
    }
  );
});

app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM notes WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.send({ message: 'Note deleted' });
  });
});

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
