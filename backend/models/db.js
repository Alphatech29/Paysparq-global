const mysql = require("mysql2");

// ✅ Convert the connection pool to use Promises
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "paysparq",
  port: 3307,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
}).promise(); 

// Test connection
pool.getConnection()
  .then((connection) => {
    console.log("✅ Database Connected Successfully");
    connection.release();
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });

module.exports = pool;
