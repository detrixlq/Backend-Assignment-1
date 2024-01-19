const express = require('express');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const app = express();

app.use('/static', express.static('myapp'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mychatdb',
  password: 'password',
  port: 5432,
});


app.use(express.json());


app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id', [username, password]);
    res.json({ userId: result.rows[0].id });
  });

  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    if (result.rows.length > 0) {
      res.json({ message: "Login successful", userId: result.rows[0].id });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  

