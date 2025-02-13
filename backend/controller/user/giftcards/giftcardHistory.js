const pool = require('../../../models/db');

// Function to get user gift card transaction history
const getUserGiftcardHistory = async (req, res) => {
  const { userUid } = req.params;

  const query = `
    SELECT
      gcth.transaction_no,
      gcth.user_id,
      gcth.avatar_url,
      gcth.card_name,
      gcth.card_type,
      gcth.card_country,
      gcth.card_value,
      gcth.trade_amount,
      gcth.card_code,
      gcth.exchange_rate,
      gcth.image_url,
      gcth.comment,
      gcth.trade_status,
      gcth.created_at
    FROM
      gift_card_trading_history gcth
    WHERE
      gcth.user_id = ?
  `;

  try {
    const [results] = await pool.query(query, [userUid]);

    // If no results are found, return an empty array with a message
    if (results.length === 0) {
      return res.status(200).json({
        message: 'No transaction history found for this user',
        data: []
      });
    }

    res.status(200).json({
      message: 'User transaction history fetched successfully',
      data: results,
    });
  } catch (err) {
    console.error('Error fetching user transaction history:', err);
    return res.status(500).json({
      error: 'Failed to fetch user transaction history',
      details: err.message || 'Database error occurred'
    });
  }
};

module.exports = { getUserGiftcardHistory };
