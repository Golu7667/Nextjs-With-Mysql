const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

app.use(express.json());

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'Admin',
  database: 'your-mysql-database',
};
 
const pool = mysql.createPool(dbConfig); 

// Create a new post
app.post('/api/posts', async (req, res) => {
  const { username, email,password } = req.body;
 
  const connection = await pool.getConnection();
 
  try {   
    const [result] = await connection.query(
      `INSERT INTO user (username, email,password) VALUES ('JohnDoe', 'johndoe@email.com','1234567')`
    );
    console.log(result)
    res.json({ id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating the post.' });
  } finally {
    connection.release();
  }
});

// Retrieve all posts
app.get('/api/posts', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM posts');
  res.json(rows);
});

// Retrieve a single post by ID
app.get('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  const [row] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
  if (row.length === 0) {
    res.status(404).json({ error: 'Post not found' });
  } else {
    res.json(row[0]);
  }
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
