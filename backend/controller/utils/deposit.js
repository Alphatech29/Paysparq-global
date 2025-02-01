const pool = require("../../models/db");


// Function to generate a unique transaction number
const generateTransactionNo = () => {
  return `${Date.now()}${Math.floor(7000 + Math.random() * 9000)}`;
};

const fundDeposit = (userID, depositAmount, transactionDescription, callback) => {
  pool.getConnection((err, connection) => {
    if (err) return callback(err, null);

    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        return callback(err, null);
      }

      // 1. Update the user's account balance
      connection.query(
        "UPDATE users SET account_balance = account_balance + ? WHERE uid = ?",
        [depositAmount, userID],
        (err, result) => {
          if (err) {
            return connection.rollback(() => {
              connection.release();
              callback(err, null);
            });
          }

          // Generate unique transaction number
          const transactionNo = generateTransactionNo();

          connection.query(
            "INSERT INTO transactions (user_id, transaction_type, amount, status, description, transaction_no) VALUES (?, ?, ?, ?, ?, ?)",
            [userID, "deposit", depositAmount, "completed", transactionDescription || "", transactionNo],
            (err, result) => {
              if (err) {
                return connection.rollback(() => {
                  connection.release();
                  callback(err, null);
                });
              }

              // Commit transaction
              connection.commit((err) => {
                if (err) {
                  return connection.rollback(() => {
                    connection.release();
                    callback(err, null);
                  });
                }

                connection.release();
                callback(null, { transactionNo, ...result });
              });
            }
          );
        }
      );
    });
  });
};

// Handle deposit request
const handleDepositRequest = (req, res) => {
  console.log("Received Deposit Request:", req.body);

  const { userID, depositAmount, transactionDescription } = req.body;

  // Validate request data
  if (!userID || !depositAmount || isNaN(depositAmount) || depositAmount <= 0) {
    return res.status(400).json({ error: "Invalid input parameters. Ensure userID and depositAmount are valid." });
  }

  // Process deposit
  fundDeposit(userID, depositAmount, transactionDescription, (err, result) => {
    if (err) {
      console.error("Deposit Error:", err);
      return res.status(500).json({ error: "An error occurred while processing the deposit." });
    }
    res.status(200).json({ message: "Deposit successful!", data: result });
  });
};

module.exports = { handleDepositRequest };
