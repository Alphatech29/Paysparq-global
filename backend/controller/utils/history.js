const pool = require("../../models/db");

// Function to get all records from vtpass_history table
exports.getAllVtpassHistory = (callback) => {
  const query = "SELECT * FROM vtpass_history";

  pool.query(query, (err, results) => {
    if (err) {
      console.error("Database Error: Failed to fetch vtpass_history data", {
        message: err.message,
        stack: err.stack,
      });
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Function to insert a new record into vtpass_history dynamically
exports.insertVtpassHistory = (columns, values, callback) => {
  // Construct placeholders for parameterized queries
  const placeholders = values.map(() => "?").join(", ");
  const query = `INSERT INTO vtpass_history (${columns.join(", ")}) VALUES (${placeholders})`;

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Database Error: Failed to insert into vtpass_history", {
        message: err.message,
        stack: err.stack,
      });
      return callback(err, null);
    }
    callback(null, result);
  });
};
