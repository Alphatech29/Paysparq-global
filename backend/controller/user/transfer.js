const pool = require("../../models/db");

// Function to generate a unique transaction number
const generateTransactionNo = () => {
  return `${Date.now()}${Math.floor(7000 + Math.random() * 9000)}`;
};

const getUserFullName = async (req, res) => {
  try {
    const { accountNumber } = req.query;

    if (!accountNumber || accountNumber.trim().length < 10) {
      return res.status(400).json({ message: "Invalid account number" });
    }

    const connection = await pool.getConnection();
    const query = "SELECT fullname FROM users WHERE account_number = ?";
    const [rows] = await connection.query(query, [accountNumber]);
    connection.release();

    if (rows.length > 0) {
      res.json({ full_name: rows[0].fullname });
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (error) {
    console.error("Error fetching user full name:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const checkBalance = async (req, res) => {
  try {
    const { accountNumber } = req.query;

    if (!accountNumber || accountNumber.trim().length < 10) {
      return res.status(400).json({ message: "Invalid account number" });
    }

    const connection = await pool.getConnection();
    const query = "SELECT account_balance FROM users WHERE account_number = ?";
    const [rows] = await connection.query(query, [accountNumber]);
    connection.release();

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

const handleTransfer = async (req, res) => {
  console.log("Received request from frontend:", req.body); // Debugging frontend data

  const { senderAccountNumber, recipientAccountNumber, amount, remarks } = req.body;

  if (!senderAccountNumber || !recipientAccountNumber || !amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid input" });
  }

  if (senderAccountNumber === recipientAccountNumber) {
    return res.status(400).json({ message: "Sorry, you can't transfer to yourself" });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [users] = await connection.query(
      "SELECT * FROM users WHERE account_number IN (?, ?)",
      [senderAccountNumber, recipientAccountNumber]
    );

    const sender = users.find((user) => user.account_number === senderAccountNumber);
    const recipient = users.find((user) => user.account_number === recipientAccountNumber);

    if (!sender) {
      await connection.rollback();
      return res.status(404).json({ message: "Sender not found" });
    }
    if (!recipient) {
      await connection.rollback();
      return res.status(404).json({ message: "Recipient not found" });
    }
    if (sender.account_balance < amount) {
      await connection.rollback();
      return res.status(400).json({ message: "Insufficient funds" });
    }

    // Ensure both users exist in DB
    const [[senderExists]] = await connection.query("SELECT uid FROM users WHERE account_number = ?", [senderAccountNumber]);
    const [[recipientExists]] = await connection.query("SELECT uid FROM users WHERE account_number = ?", [recipientAccountNumber]);

    if (!senderExists || !recipientExists) {
      await connection.rollback();
      return res.status(400).json({ message: "Invalid user ID, foreign key violation" });
    }

    const transactionNo = generateTransactionNo();
    const transactionDate = new Date();
    const transferRemarks = remarks || '';

    // Insert transaction records
    await connection.query(
      "INSERT INTO transactions (user_id, transaction_type, amount, transaction_no, status, description, transaction_date) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [sender.uid, "debit", amount, transactionNo, "success", "Transfer to Paysparq", transactionDate]
    );

    await connection.query(
      "INSERT INTO transactions (user_id, transaction_type, amount, transaction_no, status, description, transaction_date) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [recipient.uid, "credit", amount, transactionNo, "success", "Transfer from Paysparq", transactionDate]
    );

    // Insert transfer history
    await connection.query(
      "INSERT INTO bank_transfer_history (sender_id, receiver_id, receiver_name, receiver_bank, receiver_account_number, sender_name, sender_bank, sender_account_number, amount, transaction_type, destination_type, status, remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        sender.uid, recipient.uid, recipient.fullname, "Paysparq Limited",
        recipient.account_number, sender.fullname, "Paysparq Limited",
        sender.account_number, amount, "debit", "internal", "success", transferRemarks
      ]
    );

    await connection.query(
      "INSERT INTO bank_transfer_history (sender_id, receiver_id, receiver_name, receiver_bank, receiver_account_number, sender_name, sender_bank, sender_account_number, amount, transaction_type, destination_type, status, remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        sender.uid, recipient.uid, recipient.fullname, "Paysparq Limited",
        recipient.account_number, sender.fullname, "Paysparq Limited",
        sender.account_number, amount, "credit", "internal", "success", transferRemarks
      ]
    );

    // Update balances
    await connection.query("UPDATE users SET account_balance = account_balance - ? WHERE account_number = ?", [amount, senderAccountNumber]);
    await connection.query("UPDATE users SET account_balance = account_balance + ? WHERE account_number = ?", [amount, recipientAccountNumber]);

    await connection.commit();

    const [[updatedSender]] = await connection.query("SELECT account_balance FROM users WHERE account_number = ?", [senderAccountNumber]);

    res.json({
      message: "Transfer successful",
      new_balance: updatedSender.account_balance,
      sender_details: {
        receiver_name: recipient.fullname,
        receiver_account_number: recipient.account_number,
        transaction_type: "debit",
        transaction_date: transactionDate,
      },
      recipient_details: {
        sender_name: sender.fullname,
        sender_account_number: sender.account_number,
        transaction_type: "credit",
        transaction_date: transactionDate,
      }
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error during transfer:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  } finally {
    connection.release();
  }
};

module.exports = { handleTransfer, getUserFullName, checkBalance };
