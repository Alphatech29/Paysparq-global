const pool = require('../../../models/db');

const getCardDetailsWithExchangeRates = (req, res) => {
  const query = `
    SELECT 
      ccer.id AS exchange_rate_id,
      ccer.card_id,
      ccer.country,
      ccer.country_currency,
      ccer.exchange_rate,  -- Exchange rate for Naira
      gc.card_name,
      gc.avatar_url
    FROM 
      card_country_exchange_rates ccer
    JOIN 
      gift_cards gc ON ccer.card_id = gc.id
  `;

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching card details:', err);
      return res.status(500).json({ error: 'Failed to fetch card details' });
    }

    // Filter for USA cards
    const usaRate = results.filter(item => item.country === 'USA');

    // Add exchange rate in Naira
    const formattedResults = results.map(item => ({
      ...item,
      exchange_rate_naira: `₦${item.exchange_rate}`,
    }));

    // Send both allData and usaRate to frontend
    res.status(200).json({
      allData: formattedResults,
      usaRate: usaRate, 
    });
  });
};

module.exports = { getCardDetailsWithExchangeRates };
