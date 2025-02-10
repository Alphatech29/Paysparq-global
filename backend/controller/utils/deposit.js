const db = require('../../models/db');

// Function to generate a unique transaction number
const generateTransactionNo = () => {
  return `${Date.now()}${Math.floor(7000 + Math.random() * 9000)}`;
};

const fundDeposit = async (userID, depositAmount, transactionDescription, callback) => {
  try {
    // Get a database connection
    const connection = await promisePool.getConnection();  // Use promisePool to get connection
    
    // Start transaction
    await connection.beginTransaction();

    try {
      // 1. Update the user's account balance
      const [updateResult] = await connection.query(
        "UPDATE users SET account_balance = account_balance + ? WHERE uid = ?",
        [depositAmount, userID]
      );

      // Check if the update was successful
      if (updateResult.affectedRows === 0) {
        throw new Error("User not found or account update failed.");
      }

      // Generate unique transaction number
      const transactionNo = generateTransactionNo();

      // 2. Insert the transaction record
      const [transactionResult] = await connection.query(
        "INSERT INTO transactions (user_id, transaction_type, amount, status, description, transaction_no) VALUES (?, ?, ?, ?, ?, ?)",
        [userID, "deposit", depositAmount, "completed", transactionDescription || "", transactionNo]
      );

      // Commit the transaction
      await connection.commit();

      // Release the connection
      connection.release();

      // Callback with success
      callback(null, { transactionNo, ...transactionResult });
    } catch (err) {
      // If any query fails, rollback the transaction
      await connection.rollback();
      connection.release();
      callback(err, null);
    }
  } catch (err) {
    callback(err, null);
  }
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
