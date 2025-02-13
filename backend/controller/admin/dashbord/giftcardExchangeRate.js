const pool = require('../../../models/db');
const { convertToNigeriaTime } = require('../../utils/date');
const { saveUploadedImages } = require('../../utils/fileUpload')



//Function to get all card and rates
const getAllExchangeRates = async (req, res) => {
  try {
    const query = `
      SELECT 
        ccer.*, 
        gc.card_name, 
        gc.avatar_url 
      FROM card_country_exchange_rates ccer
      JOIN gift_cards gc ON ccer.card_id = gc.id
    `;

    const [results] = await pool.query(query);

    if (results.length === 0) {
      return res.json([]);
    }

    const updatedResults = results.map(rate => ({
      ...rate,
      updated_at: convertToNigeriaTime(rate.updated_at)
    }));

    return res.json(updatedResults);

  } catch (err) {
    console.error('Database Error:', err);
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

//Function to Delete card by Id
const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;

    if (!cardId) {
      return res.status(400).json({ message: 'Card ID is required' });
    }

    await pool.query('DELETE FROM card_country_exchange_rates WHERE card_id = ?', [cardId]);
    
    const [deleteResult] = await pool.query('DELETE FROM gift_cards WHERE id = ?', [cardId]);
    
    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ message: 'Card not found' });
    }

    return res.json({ message: 'Card and associated rates deleted successfully' });
  } catch (err) {
    console.error('Database Error:', err);
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

//Founction to create new giftcard
const createCard = async (req, res) => {
  try {
    const { card_name, avatar } = req.body;

    if (!card_name || !avatar) {
      return res.status(400).json({ status: 'error', message: 'Card name and avatar URL are required' });
    }

    const buffer = Buffer.from(avatar, 'base64');
 
    const selectedImages = [{ buffer }];
    const baseURL = `${req.protocol}://${req.get('host')}`;
    const imageUrls = await saveUploadedImages(selectedImages, baseURL);

    const avatar_url = imageUrls[0];

    const [cardResult] = await pool.query(
      'INSERT INTO gift_cards (card_name, avatar_url) VALUES (?, ?)',
      [card_name, avatar_url]
    );

    const responseData = {
      status: 'success',
      message: 'Card created successfully',
      cardId: cardResult.insertId
    };
    return res.status(201).json(responseData);

  } catch (err) {
    console.error('Database Error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal Server Error', error: err.message });
  }
};



//All cards
const getAllGiftCards = async (req, res) => {
  const query = `SELECT * FROM gift_cards`; // Select all columns from the gift_cards table

  try {
    const [results] = await pool.query(query);

    res.status(200).json({
      status: 'success',
      cards: results,
    });
  } catch (err) {
    console.error('Error fetching gift cards:', err);
    return res.status(500).json({ status: 'error', message: 'Failed to fetch gift cards' });
  }
};


// Function to create exchange rate
const createExchangeRate = async (req, res) => {
  try {
    // Log the data received from the frontend
    console.log("Received data from frontend:", req.body);

    const { card_id, country, currency, rate } = req.body;

    if (!card_id || !country || !currency || !rate) {
      return res.status(400).json({
        status: 'error',
        message: 'Card ID, country, currency, and exchange rate are required'
      });
    }

    await pool.query(
      'INSERT INTO card_country_exchange_rates (card_id, country, country_currency, exchange_rate) VALUES (?, ?, ?, ?)',
      [card_id, country, currency, rate]
    );

    return res.status(201).json({
      status: 'success',
      message: 'Exchange rate added successfully'
    });
  } catch (err) {
    console.error('Database Error:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
      error: err.message
    });
  }
};






module.exports = { getAllExchangeRates, deleteCard, createCard, createExchangeRate, getAllGiftCards };
