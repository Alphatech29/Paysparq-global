const mysql = require('mysql2');

// Create the connection pool
const pool = mysql.createPool({
  host: 'localhost',       
  user: 'root',            
  password: '',            
  database: 'paysparq',   
  port: 3307,
  waitForConnections: true, 
  connectionLimit: 10,      
  queueLimit: 0,            
  connectTimeout: 10000               
});


module.exports = pool;

