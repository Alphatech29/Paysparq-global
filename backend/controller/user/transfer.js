const pool = require("../../models/db");

// Function to get user full name based on account number
const getUserFullName = async (req, res) => {
  try {
    const accountNumber = req.query.accountNumber;

    if (!accountNumber || accountNumber.trim().length < 10) {
      return res.status(400).json({ message: "Invalid account number" });
    }

    console.log('Account number received:', accountNumber);

    const query = 'SELECT fullname FROM users WHERE account_number = ?';
    const [rows] = await pool.promise().query(query, [accountNumber]);

    if (rows.length > 0) {
      res.json({ full_name: rows[0].fullname });
    } else {
      res.status(404).json({ message: "Invalid account number" });
    }
  } catch (error) {
    console.error("Error fetching user full name:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Function to check sender's balance
const checkBalance = async (req, res) => {
  try {
    const { accountNumber } = req.query;

    if (!accountNumber || accountNumber.trim().length < 10) {
      return res.status(400).json({ message: "Invalid account number" });
    }

    const query = 'SELECT account_balance FROM users WHERE account_number = ?';
    const [rows] = await pool.promise().query(query, [accountNumber]);

    if (rows.length > 0) {
      res.json({ balance: rows[0].account_balance });
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (error) {
    console.error("Error checking balance:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Function to handle the transfer logic
const handleTransfer = async (req, res) => {
  const { senderAccountNumber, recipientAccountNumber, amount } = req.body;

  if (!senderAccountNumber || !recipientAccountNumber || !amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    // Fetch both sender and recipient details
    const [users] = await pool.promise().query(
      'SELECT * FROM users WHERE account_number IN (?, ?)',
      [senderAccountNumber, recipientAccountNumber]
    );

    const sender = users.find(user => user.account_number === senderAccountNumber);
    const recipient = users.find(user => user.account_number === recipientAccountNumber);

    if (!sender) return res.status(404).json({ message: "Sender not found" });
    if (!recipient) return res.status(404).json({ message: "Recipient not found" });
    if (sender.account_balance < amount) return res.status(400).json({ message: "Insufficient funds" });

    // Update balances
    await pool.promise().query(
      'UPDATE users SET account_balance = account_balance - ? WHERE account_number = ?',
      [amount, senderAccountNumber]
    );
    await pool.promise().query(
      'UPDATE users SET account_balance = account_balance + ? WHERE account_number = ?',
      [amount, recipientAccountNumber]
    );

    // Insert transaction record
    await pool.promise().query(
      'INSERT INTO transactions (sender_id, recipient_id, amount, status) VALUES (?, ?, ?, ?)',
      [sender.uid, recipient.uid, amount, 'success']
    );

    return res.json({ message: "Transfer successful", balance: sender.account_balance - amount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Export the handler functions
module.exports = { handleTransfer, getUserFullName, checkBalance };
