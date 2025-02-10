const db = require("../../models/db");

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

    console.log("Account number received:", accountNumber);

    const query = "SELECT fullname FROM users WHERE account_number = ?";
    const [rows] = await db.query(query, [accountNumber]);  // Use `db` instead of `pool`

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

// Function to check user balance
const checkBalance = async (req, res) => {
  try {
    const { accountNumber } = req.query;

    if (!accountNumber || accountNumber.trim().length < 10) {
      return res.status(400).json({ message: "Invalid account number" });
    }

    const query = "SELECT account_balance FROM users WHERE account_number = ?";
    const [rows] = await db.query(query, [accountNumber]);  // Use `db` instead of `promisePool`

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
  const { senderAccountNumber, recipientAccountNumber, amount, remarks } = req.body;

  // Validate input
  if (!senderAccountNumber || !recipientAccountNumber || !amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid input" });
  }

  // Check if sender and recipient are the same
  if (senderAccountNumber === recipientAccountNumber) {
    return res.status(400).json({ message: "Sorry, you can't transfer to yourself" });
  }

  const connection = await db.getConnection();  // Use `db` instead of `promisePool`
  try {
    await connection.beginTransaction();

    // Fetch both sender and recipient details
    const [users] = await connection.query(
      "SELECT * FROM users WHERE account_number IN (?, ?)",
      [senderAccountNumber, recipientAccountNumber]
    );

    const sender = users.find((user) => user.account_number === senderAccountNumber);
    const recipient = users.find((user) => user.account_number === recipientAccountNumber);

    if (!sender) return res.status(404).json({ message: "Sender not found" });
    if (!recipient) return res.status(404).json({ message: "Recipient not found" });
    if (sender.account_balance < amount) return res.status(400).json({ message: "Insufficient funds" });

    // Ensure both sender and recipient IDs exist in the users table before proceeding
    const [senderExists] = await connection.query(
      "SELECT uid FROM users WHERE account_number = ?",
      [senderAccountNumber]
    );
    const [recipientExists] = await connection.query(
      "SELECT uid FROM users WHERE account_number = ?",
      [recipientAccountNumber]
    );

    if (!senderExists.length || !recipientExists.length) {
      await connection.rollback();
      return res.status(400).json({ message: "Invalid user ID, foreign key violation" });
    }

    // Generate unique transaction number and date
    const transactionNo = generateTransactionNo();
    const transactionDate = new Date();

    // Insert transaction record for sender (Debit)
    await connection.query(
      "INSERT INTO transactions (user_id, transaction_type, amount, transaction_no, status, description, transaction_date) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [sender.uid, "debit", amount, transactionNo, "success", "Transfer to Paysparq", transactionDate]
    );

    // Insert transaction record for recipient (Credit)
    await connection.query(
      "INSERT INTO transactions (user_id, transaction_type, amount, transaction_no, status, description, transaction_date) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [recipient.uid, "credit", amount, transactionNo, "success", "Transfer from Paysparq", transactionDate]
    );

    const transferRemarks = remarks || ''; 

    // Insert transfer history for sender
    await connection.query(
      'INSERT INTO bank_transfer_history (sender_id, receiver_id, receiver_name, receiver_bank, receiver_account_number, sender_name, sender_bank, sender_account_number, amount, transaction_type, destination_type, status, remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        sender.uid,
        recipient.uid,
        recipient.fullname,
        "Paysparq Limited", 
        recipient.account_number,
        sender.fullname,
        "Paysparq Limited", 
        sender.account_number,
        amount,
        'debit',
        'internal',
        'success',
        transferRemarks 
      ]
    );

    // Insert transfer history for recipient
    await connection.query(
      'INSERT INTO bank_transfer_history (sender_id, receiver_id, receiver_name, receiver_bank, receiver_account_number, sender_name, sender_bank, sender_account_number, amount, transaction_type, destination_type, status, remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        sender.uid,
        recipient.uid,
        recipient.fullname,
        "Paysparq Limited", 
        recipient.account_number,
        sender.fullname,
        "Paysparq Limited", 
        sender.account_number,
        amount,
        'credit',
        'internal',
        'success',
        transferRemarks
      ]
    );

    // Update balances
    await connection.query(
      "UPDATE users SET account_balance = account_balance - ? WHERE account_number = ?",
      [amount, senderAccountNumber]
    );
    await connection.query(
      "UPDATE users SET account_balance = account_balance + ? WHERE account_number = ?",
      [amount, recipientAccountNumber]
    );

    await connection.commit();

    // Fetch updated sender balance after transaction
    const [updatedSender] = await connection.query(
      "SELECT account_balance FROM users WHERE account_number = ?",
      [senderAccountNumber]
    );

    res.json({
      message: "Transfer successful",
      new_balance: updatedSender[0].account_balance,
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
