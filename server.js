import express from 'express';
import db from './db.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});


app.post('/students', (req, res) => {
  const { name, class: studentClass, age } = req.body;

  const sql = 'INSERT INTO students (name, class, age) VALUES (?, ?, ?)';
  db.query(sql, [name, studentClass, age], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Student added', id: result.insertId });
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
