const pool = require('../../models/db'); 

// Function to generate a unique transaction number
const generateTransactionNo = () => {
  return `${Date.now()}${Math.floor(7000 + Math.random() * 9000)}`;
};

const fundDeposit = async (userID, depositAmount, transactionDescription) => {
  let connection;
  
  try {
    // Get a database connection
    connection = await pool.getConnection(); // Use pool instead of promisePool
    await connection.beginTransaction(); // Start transaction

    // 1. Update the user's account balance
    const [updateResult] = await connection.query(
      "UPDATE users SET account_balance = account_balance + ? WHERE uid = ?",
      [depositAmount, userID]
    );

    if (updateResult.affectedRows === 0) {
      throw new Error("User not found or account update failed.");
    }

    // 2. Insert the transaction record
    const transactionNo = generateTransactionNo();
    await connection.query(
      "INSERT INTO transactions (user_id, transaction_type, amount, status, description, transaction_no) VALUES (?, ?, ?, ?, ?, ?)",
      [userID, "deposit", depositAmount, "completed", transactionDescription || "", transactionNo]
    );

    await connection.commit(); // Commit transaction
    return { transactionNo };  // Return transaction details

  } catch (err) {
    if (connection) await connection.rollback(); // Rollback on error
    throw err;
  } finally {
    if (connection) connection.release(); // Release connection
  }
};

// Handle deposit request
const handleDepositRequest = async (req, res) => {
  try {
    console.log("Received Deposit Request:", req.body);
    const { userID, depositAmount, transactionDescription } = req.body;

    // Validate request data
    if (!userID || !depositAmount || isNaN(depositAmount) || depositAmount <= 0) {
      return res.status(400).json({ error: "Invalid input parameters. Ensure userID and depositAmount are valid." });
    }

    // Process deposit
    const result = await fundDeposit(userID, depositAmount, transactionDescription);
    res.status(200).json({ message: "Deposit successful!", data: result });

  } catch (err) {
    console.error("Deposit Error:", err);
    res.status(500).json({ error: "An error occurred while processing the deposit." });
  }
};

module.exports = { handleDepositRequest };
