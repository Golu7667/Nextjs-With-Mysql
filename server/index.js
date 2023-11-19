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
async function createTable() {
  const connection = await pool.getConnection();
  try {
    // Define the table creation query
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS namedata (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `;

    // Execute the table creation query
    await connection.execute(createTableQuery);
    console.log('Table created or already exists.');

  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    connection.release();
  }
}

// Create the table before starting the server
createTable();


// Create a new post
app.post('/api/posts', async (req, res) => {
  const {name } = req.body;
 console.log(name)
 const connection = await pool.getConnection();
  
 
  try {   
    const [result] = await connection.execute('INSERT INTO namedata (name) VALUES (?)', [name])
    console.log(result)
    res.json({ id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating the post.' });
  } finally {
    connection.release();
  }
});

app.get('/api/alldata',async(req,res)=>{
  const connection = await pool.getConnection();
try{
  const [rows] = await connection.execute('SELECT * FROM namedata');
  console.log(rows)
  res.send(rows)
}catch(error){
  res.status(500).json({ error: 'Error creating the post.' });
}finally {
  connection.release();
}

})

app.put('/api/alldata/:id', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { id } = req.params;
    const { newName } = req.body;
     console.log(newName)
    if (!newName) {
      return res.status(400).json({ error: 'New name is required for update.' });
    }

    const updateQuery = 'UPDATE namedata SET name = ? WHERE id = ?';
    const [results] = await connection.execute(updateQuery, [newName, id]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Record not found for update.' });
    }

    res.json({ message: 'Record updated successfully.' });
  } catch (error) {
    console.error('Error updating record:', error);
    res.status(500).json({ error: 'Error updating record.' });
  } finally {
    connection.release();
  }
});
app.delete('/api/data/:id', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { id } = req.params;

    const deleteQuery = 'DELETE FROM namedata WHERE id = ?';
    const [results] = await connection.execute(deleteQuery, [id]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Record not found for delete.' });
    }

    res.json({ message: 'Record deleted successfully.' });
  } catch (error) {
    console.error('Error deleting record:', error);
    res.status(500).json({ error: 'Error deleting record.' });
  } finally {
    connection.release();
  }
});



app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
