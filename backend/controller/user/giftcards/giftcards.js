const pool = require('../../../models/db');
const { saveUploadedImages } = require('../../utils/fileUpload'); 
const { generateTransactionNo } = require('../../utils/transactionNo');

// Function to get all card details with exchange rates
const getCardDetailsWithExchangeRates = async (req, res) => {
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

  try {
    const [results] = await pool.query(query);

    const formattedResults = results.map(item => ({
      ...item,
      exchange_rate_naira: `₦${item.exchange_rate}`,
    }));

    const usaCards = formattedResults.filter(item => item.country === 'USA');

    res.status(200).json({
      allData: formattedResults,
      usaRate: usaCards,
    });
  } catch (err) {
    console.error('Error fetching card details:', err);
    return res.status(500).json({ error: 'Failed to fetch card details' });
  }
};

const submitCardDetails = async (req, res) => {
  const {
    user_id,
    selectedCard,
    selectedCardDetails,
    selectedCountry,
    cardAmount,
    nairaAmount,
    eCode,
    exchangeRate,
    selectedImages,
  } = req.body;

  if (!selectedCard || !selectedCardDetails || !selectedCountry || !cardAmount || isNaN(cardAmount) || cardAmount <= 0 || !nairaAmount || isNaN(nairaAmount) || nairaAmount <= 0 || !user_id) {
    return res.status(400).json({ error: 'Invalid input. Please check required fields.' });
  }

  if (selectedCard === 'eCode' && !eCode) {
    return res.status(400).json({ error: 'eCode is required for eCode card type' });
  }

  const transactionNo = generateTransactionNo();
  const baseURL = `${req.protocol}://${req.get('host')}`;

  let fullImageURLs = [];
  try {
    fullImageURLs = saveUploadedImages(selectedImages, baseURL);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  const dbData = [
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
    fullImageURLs.length > 0 ? fullImageURLs.join(',') : null,
    'pending',
  ];

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

  try {
    await pool.query(query, dbData);
    res.status(200).json({ message: 'Form data and trade history submitted successfully!' });
  } catch (err) {
    console.error('Error saving card trading history:', err);
    return res.status(500).json({ error: 'Failed to submit card details' });
  }
};

module.exports = {
  getCardDetailsWithExchangeRates,
  submitCardDetails,
};
