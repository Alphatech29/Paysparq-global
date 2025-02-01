const mysql = require('mysql2');

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


pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.code);
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error("Access Denied. Check your username and password.");
    } else if (err.code === 'ECONNREFUSED') {
      console.error("Connection Refused. Check if the MySQL server is running.");
    }
    return;
  }

  console.log("Database Connected Successfully");
  connection.release(); 
});


module.exports = pool;
