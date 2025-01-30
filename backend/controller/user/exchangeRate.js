const axios = require("axios");
const db = require("../../models/db");
const cron = require("node-cron");

const API_URL = "https://v6.exchangerate-api.com/v6/9f37357b42de3866485a068b/latest/USD";

// Fetch exchange rates from the API
async function fetchExchangeRates() {
  try {
    const response = await axios.get(API_URL);
    const rates = response.data.conversion_rates;
    const NGNRate = rates.NGN;

    return {
      USD: NGNRate,
      EUR: NGNRate / rates.EUR,
      GBP: NGNRate / rates.GBP,
    };
  } catch (error) {
    console.error("Error fetching exchange rates:", error.message);
    return null;
  }
}

// Add spreads to calculate realistic buying and selling rates
function calculateRates(baseRates) {
  const spreads = {
    USD: { buy: 6, sell: 8.9 },
    EUR: { buy: 6.1, sell: 8.9 },
    GBP: { buy: 5.5, sell: 9.5 },
  };

  return Object.fromEntries(
    Object.entries(baseRates).map(([currency, rate]) => {
      const { buy, sell } = spreads[currency];
      return [
        currency,
        {
          buying: (rate * (1 + buy / 100)).toFixed(2),
          selling: (rate * (1 + sell / 100)).toFixed(2),
        },
      ];
    })
  );
}

// Save exchange rates to the database
async function saveToDatabase(rates) {
  try {
    const upsertData = Object.entries(rates).map(([currency, { buying, selling }]) => [
      currency,
      buying,
      selling,
      new Date(),
      new Date(),
    ]);

    const query = `
      INSERT INTO exchange_rate (currency_name, buying_rate, selling_rate, created_at, updated_at)
      VALUES ?
      ON DUPLICATE KEY UPDATE
        buying_rate = VALUES(buying_rate),
        selling_rate = VALUES(selling_rate),
        updated_at = VALUES(updated_at);
    `;

    db.query(query, [upsertData], (error, results) => {
      if (error) {
        console.error("Error saving exchange rates to database:", error.message);
        throw error;
      }
      console.log("Rates saved successfully:", results);
    });
  } catch (error) {
    console.error("Error saving exchange rates:", error.message);
  }
}

// Update exchange rates and log results
async function updateExchangeRates() {
  try {
    const baseRates = await fetchExchangeRates();
    if (!baseRates) {
      console.error("Failed to fetch exchange rates.");
      return;
    }

    const rates = calculateRates(baseRates);

    console.log("Formatted Rates to Save:", JSON.stringify(rates, null, 2));

    await saveToDatabase(rates);

    console.log("Exchange rates updated successfully at:", new Date().toISOString());

    console.log("Exchange Rates Table:");
    console.table(rates);
  } catch (error) {
    console.error("Error updating exchange rates:", error.message);
  }
}

// Automatically update exchange rates 3x in a week
cron.schedule("0 18 * * 1,3,5", updateExchangeRates);

// API endpoint to get exchange rates
async function getExchangeRates(req, res) {
  try {
    const query = "SELECT * FROM exchange_rate ORDER BY updated_at ";
    db.query(query, (error, results) => {
      if (error) {
        console.error("Error fetching rates from database:", error.message);
        return res.status(500).json({ message: "Error fetching exchange rates." });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "No exchange rates found in the database." });
      }

      res.status(200).json({ rates: results });
    });
  } catch (error) {
    console.error("Error fetching rates from database:", error.message);
    res.status(500).json({ message: "Error fetching exchange rates." });
  }
}

module.exports = { getExchangeRates };
