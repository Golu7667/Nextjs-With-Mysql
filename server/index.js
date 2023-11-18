const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const cors=require("cors")

app.use(express.json());

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'Admin',
  database: 'your-mysql-database',
};

app.use(cors({origin:"*"}))

const pool = mysql.createPool(dbConfig); 

// Create a new post
app.post('/api/posts', async (req, res) => {
  const {name } = req.body;
 console.log(name)
  const connection = await pool.getConnection();
 
  try {   
    const [result] = await connection.query(
      `INSERT INTO namedata (name) VALUES (${name})`
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
