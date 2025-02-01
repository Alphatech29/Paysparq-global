const db = require("../../models/db");

// Function to get transaction history for a specific user
const getUserTransactions = (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    const sqlQuery = `
        SELECT txn_id AS transaction_id, transaction_no, user_id, transaction_type, 
               amount, DATE_FORMAT(transaction_date, '%Y-%m-%d %H:%i:%s') AS transaction_date, 
               status, description 
        FROM transactions 
        WHERE user_id = ?
        ORDER BY transaction_date DESC
    `;
    
    db.query(sqlQuery, [userId], (err, results) => {
        if (err) {
            console.error("Error fetching transactions:", err);
            return res.status(500).json({ error: "Failed to retrieve transactions", details: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No transactions found for this user" });
        }

        res.status(200).json(results);
    });
};

module.exports = { getUserTransactions };
