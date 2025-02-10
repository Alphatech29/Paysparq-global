const pool = require('../../../models/db');

// Admin approval or rejection of trade
const approveTrade = async (req, res) => {
  const { transactionNo, action, comment } = req.body;  // Change rejectionComment to comment

  // Log the incoming request body
  console.log('Incoming Request Body:', req.body);

  // Map action to approvalStatus
  const approvalStatus = action;

  try {
    // Fetch trade details (amount, user ID, and trade status)
    const fetchAmountQuery = `SELECT trade_amount, user_id, trade_status FROM gift_card_trading_history WHERE transaction_no = ?`;
    const [results] = await pool.execute(fetchAmountQuery, [transactionNo]);

    if (results.length === 0) {
      console.log('Transaction not found');
      return res.status(404).json({ error: 'Transaction not found' });
    }

    const { trade_amount, user_id, trade_status } = results[0];
    console.log('Transaction Details:', results);

    // Block further actions if trade is already rejected or completed
    if (trade_status === 'rejected' || trade_status === 'completed') {
      console.log(`Trade ${transactionNo} has already been processed`);
      return res.status(400).json({ error: 'This trade has already been processed' });
    }

    // Handle rejection
    if (approvalStatus === 'rejected') {
      // Log the rejection comment
      console.log('Rejection Comment:', comment);

      if (!comment || comment.trim() === "") {
        console.log('Rejection comment is required');
        return res.status(400).json({ error: 'Rejection comment is required' });
      }

      const updateTradeQuery = `UPDATE gift_card_trading_history SET trade_status = ?, comment = ? WHERE transaction_no = ?`;
      const [updateTradeResult] = await pool.execute(updateTradeQuery, [approvalStatus, comment, transactionNo]);

      if (updateTradeResult.affectedRows === 0) {
        console.log('Failed to update trade status to rejected');
        return res.status(500).json({ error: 'Failed to update trade status' });
      }

      console.log(`Trade ${transactionNo} successfully rejected`);
      return res.status(200).json({
        message: `Trade ${transactionNo} successfully rejected`,
      });
    }

    // If the trade is approved, proceed to credit the user
    if (approvalStatus === 'completed') {
      const updateTradeQuery = `UPDATE gift_card_trading_history SET trade_status = ? WHERE transaction_no = ?`;
      const [updateTradeResult] = await pool.execute(updateTradeQuery, [approvalStatus, transactionNo]);

      if (updateTradeResult.affectedRows === 0) {
        console.log('Failed to update trade status');
        return res.status(500).json({ error: 'Failed to update trade status' });
      }

      // Check user balance
      const userBalanceQuery = `SELECT account_balance FROM users WHERE uid = ?`;
      const [userResult] = await pool.execute(userBalanceQuery, [user_id]);
      console.log('User Balance Query Result:', userResult);

      if (userResult.length === 0) {
        // Create new user if not found
        const insertUserQuery = `INSERT INTO users (uid, account_balance) VALUES (?, ?)`;
        await pool.execute(insertUserQuery, [user_id, trade_amount]);
        console.log(`New user created and credited with amount: ${trade_amount}`);
      } else {
        // Update existing user's account balance
        const updateBalanceQuery = `UPDATE users SET account_balance = account_balance + ? WHERE uid = ?`;
        await pool.execute(updateBalanceQuery, [trade_amount, user_id]);
        console.log(`User ${user_id} credited with amount: ${trade_amount}`);
      }

      // Mark the trade as completed
      const completeQuery = `UPDATE gift_card_trading_history SET trade_status = 'completed' WHERE transaction_no = ?`;
      const [completeResult] = await pool.execute(completeQuery, [transactionNo]);

      if (completeResult.affectedRows === 0) {
        console.log('Failed to mark trade as completed');
        return res.status(500).json({ error: 'Failed to mark trade as completed' });
      }

      console.log(`Trade ${transactionNo} successfully approved and completed`);
      return res.status(200).json({
        message: `Trade ${transactionNo} successfully approved and completed`,
      });
    }

    console.log('Invalid approval status');
    return res.status(400).json({ error: 'Invalid approval status' });

  } catch (err) {
    console.error('Error processing trade:', err);
    return res.status(500).json({ error: 'Error processing trade: ' + err.message, details: err });
  }
};

// Get all gift card transaction history with username
const getAllGiftCardHistory = async (req, res) => {
  const query = `
    SELECT g.*, u.username 
    FROM gift_card_trading_history g
    LEFT JOIN users u ON g.user_id = u.uid
    ORDER BY g.created_at DESC
  `;

  try {
    const [results] = await pool.execute(query);
    return res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching gift card trading history:', err);
    return res.status(500).json({ error: 'Failed to fetch gift card trading history: ' + err.message });
  }
};

module.exports = { approveTrade, getAllGiftCardHistory };
