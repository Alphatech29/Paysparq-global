const pool = require('../../../models/db');
const { generateTransactionNo } = require('../../utils/transactionNo');


const getCardDetailsWithExchangeRates = (req, res) => {
  const query = `
    SELECT
      ccer.id AS exchange_rate_id,
      ccer.card_id,
      ccer.country,
      ccer.country_currency,
      ccer.exchange_rate,
      gc.card_name,
      gc.avatar_url
    FROM 
      card_country_exchange_rates ccer
    JOIN 
      gift_cards gc ON ccer.card_id = gc.id
    GROUP BY 
      ccer.card_id, ccer.country, ccer.country_currency, ccer.exchange_rate, gc.card_name, gc.avatar_url
  `;

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching card details:', err);
      return res.status(500).json({ error: 'Failed to fetch card details' });
    }

    const formattedResults = results.map(item => ({
      ...item,
      exchange_rate_naira: `₦${item.exchange_rate}`,
    }));

    const usaCards = formattedResults.filter(item => item.country === 'USA');

    res.status(200).json({
      allData: formattedResults,
      usaRate: usaCards,  
    });
  });
};

const submitCardDetails = (req, res) => {
  const {
    user_id,
    selectedCard,
    selectedCardDetails,
    selectedImages,
    selectedCountry,
    cardAmount,
    nairaAmount,
    eCode,
    exchangeRate 
  } = req.body;


  if (!selectedCard) {
    return res.status(400).json({ error: 'Card type is required' });
  }
  
  if (!selectedCardDetails) {
    return res.status(400).json({ error: 'Card details are required' });
  }

  if (!selectedCountry) {
    return res.status(400).json({ error: 'Selected country is required' });
  }

  if (!cardAmount || isNaN(cardAmount) || cardAmount <= 0) {
    return res.status(400).json({ error: 'Card amount must be a valid number greater than 0' });
  }

  if (!nairaAmount || isNaN(nairaAmount) || nairaAmount <= 0) {
    return res.status(400).json({ error: 'Naira amount must be a valid number greater than 0' });
  }

  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  if (selectedCard === 'eCode' && !eCode) {
    return res.status(400).json({ error: 'eCode is required for eCode card type' });
  }

  const transactionNo = generateTransactionNo();

  // Insert data into the gift_card_trading_history table
  const query = `
    INSERT INTO gift_card_trading_history (
      transaction_no,
      user_id,
      avatar_url,
      card_name,
      card_type,
      card_country,
      card_value,
      trade_amount,
      exchange_rate,
      card_code,
      image_url,
      trade_status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  pool.query(query, [
    transactionNo,
    user_id, 
    selectedCardDetails.avatar_url,
    selectedCardDetails.card_name,
    selectedCard, 
    selectedCountry,
    cardAmount,
    nairaAmount,
    parseFloat(exchangeRate), 
    selectedCard === 'eCode' ? eCode : null, 
    selectedImages.length > 0 ? selectedImages[0].id : null,
    'pending'
  ], (err, result) => {
    if (err) {
      console.error('Error saving card trading history:', err);
      return res.status(500).json({ error: 'Failed to submit card details' });
    }

    res.status(200).json({ message: 'Form data and trade history submitted successfully!' });
  });
};


// Admin approval or rejection of trade
const adminApproveTrade = (req, res) => {
  const { transactionNo, approvalStatus } = req.body; 

  if (!transactionNo || !approvalStatus) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Update the trade status and add account balance if approved
  let updateQuery = `UPDATE gift_card_trading_history SET trade_status = ? WHERE transaction_no = ?`;
  
  if (approvalStatus === 'approved') {
    const fetchAmountQuery = `SELECT trade_amount, user_id FROM gift_card_trading_history WHERE transaction_no = ?`;
    
    pool.query(fetchAmountQuery, [transactionNo], (err, results) => {
      if (err || results.length === 0) {
        console.error('Error fetching trade amount:', err);
        return res.status(500).json({ error: 'Failed to fetch trade amount' });
      }
      
      const { trade_amount, user_id } = results[0];

      // Update user's balance
      const balanceQuery = `UPDATE users SET balance = balance + ? WHERE id = ?`;
      pool.query(balanceQuery, [trade_amount, user_id], (err) => {
        if (err) {
          console.error('Error updating user balance:', err);
          return res.status(500).json({ error: 'Failed to update user balance' });
        }

        // Now, update the trade status to succeeded
        pool.query(updateQuery, ['succeeded', transactionNo], (err) => {
          if (err) {
            console.error('Error updating trade status:', err);
            return res.status(500).json({ error: 'Failed to update trade status' });
          }

          res.status(200).json({ message: 'Trade successfully approved and user balance updated!' });
        });
      });
    });
  } else {
    pool.query(updateQuery, ['rejected', transactionNo], (err) => {
      if (err) {
        console.error('Error rejecting trade:', err);
        return res.status(500).json({ error: 'Failed to reject trade' });
      }
      res.status(200).json({ message: 'Trade successfully rejected!' });
    });
  }
};

module.exports = { 
  getCardDetailsWithExchangeRates, 
  submitCardDetails, 
  adminApproveTrade 
};
