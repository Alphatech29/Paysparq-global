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
    console.error("Database connection failed:", err);
  } else {
    console.log("Database Connected Successfully");
    connection.release(); 
  }
});

module.exports = pool;
