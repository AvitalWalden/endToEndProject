const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'postDB',
  port: 3306,
  password: '12WALDEN',
}).promise();

module.exports = pool;



