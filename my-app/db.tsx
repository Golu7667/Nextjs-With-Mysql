// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'your-mysql-host',
  user: 'root',
  password: 'Admin',
  database: 'your-mysql-database',
  connectionLimit: 10,
});

export default pool;
