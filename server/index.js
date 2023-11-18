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



app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
