const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'taskuser',
  password: process.env.DB_PASSWORD || 'taskpass',
  database: process.env.DB_NAME || 'taskmanagerdb'
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = connection;
