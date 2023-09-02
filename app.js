const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '353117', // Replace with your MySQL root password
  database: 'packitmate'
});

db.connect((err) => {
  if (err) {
    console.log(err); // Log any connection errors
    throw err;
  }
  console.log('Connected to database');
});

app.post('/register', (req, res) => {
  const { email, password, userType } = req.body;
  const query = 'INSERT INTO users (email, password, userType) VALUES (?, ?, ?)';
  db.query(query, [email, password, userType], (err, result) => {
    if (err) {
      console.log(err); // Log any query errors
      res.status(500).send(err);
    } else {
      res.status(200).send('User registered');
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
