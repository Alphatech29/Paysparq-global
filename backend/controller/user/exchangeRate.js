const axios = require("axios");
const supabase = require("../../models/supaBase/supaBaseClient");
const cron = require("node-cron");

const API_URL = "https://v6.exchangerate-api.com/v6/9f37357b42de3866485a068b/latest/";

// Fetch exchange rates from the API and calculate rates in Naira
async function fetchExchangeRates() {
  try {
    const response = await axios.get(API_URL);
    const rates = response.data.conversion_rates;

    // Get the Naira (NGN) exchange rate
    const NGNRate = rates.NGN;

    // Calculate buying and selling rates in Naira
    return {
      USD: { buying: rates.USD * NGNRate, selling: rates.USD * NGNRate },
      EUR: { buying: rates.EUR * NGNRate, selling: rates.EUR * NGNRate },
      GBP: { buying: rates.GBP * NGNRate, selling: rates.GBP * NGNRate },
    };
  } catch (error) {
    console.error("Error fetching exchange rates:", error.message);
    return null;
  }
}

// Add a percentage gain to the Naira rates
function addGain(rates, gainPercent = 10) {
  return Object.fromEntries(
    Object.entries(rates).map(([currency, { buying, selling }]) => [
      currency,
      {
        buying: (buying * (1 + gainPercent / 100)).toFixed(2), // Add gain to buying rate
        selling: (selling * (1 + gainPercent / 100)).toFixed(2), // Add gain to selling rate
      },
    ])
  );
}

// Save exchange rates to Supabase
async function saveToDatabase(rates) {
  try {
    const upsertData = Object.entries(rates).map(([currency, { buying, selling }]) => ({
      currency_name: currency,
      buying_rate: buying, // Buying rate in Naira
      selling_rate: selling, // Selling rate in Naira
      last_updated: new Date().toISOString(),
      created_at: new Date().toISOString(),
    }));

    const { data, error } = await supabase
      .from("p_exchange_rates")
      .upsert(upsertData, { onConflict: ["currency_name"] });

    if (error) {
      console.error("Error saving rates to database:", error.message || error.details);
      throw error;
    }

    console.log("Rates saved successfully:", data);
    return data;
  } catch (error) {
    console.error("Error saving exchange rates:", error.message);
    return null;
  }
}

// Update exchange rates and log results
async function updateExchangeRates() {
  try {
    const rates = await fetchExchangeRates();
    if (!rates) {
      console.error("Failed to fetch exchange rates.");
      return;
    }

    const manipulatedRates = addGain(rates, 10); // Add a 10% gain

    // Log the rates before saving to database
    console.log("Formatted Rates to Save:", JSON.stringify(manipulatedRates, null, 2));

    const savedRates = await saveToDatabase(manipulatedRates);

    if (!savedRates) {
      console.error("Failed to save rates to the database.");
      return;
    }

    console.log("Exchange rates updated successfully at:", new Date().toISOString());

    // Log the output in table format
    console.log("Exchange Rates Table:");
    console.table(manipulatedRates);
  } catch (error) {
    console.error("Error updating exchange rates:", error.message);
  }
}

// Automatically update exchange rates every hour using cron job
//cron.schedule("*/1 * * * *", updateExchangeRates); 

// API endpoint to get exchange rates
async function getExchangeRates(req, res) {
  try {
    const { data, error } = await supabase.from("p_exchange_rates").select("*").order("last_updated", { ascending: false });
    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ message: "No exchange rates found in the database." });
    }

    res.status(200).json({ rates: data });
  } catch (error) {
    console.error("Error fetching rates from database:", error.message);
    res.status(500).json({ message: "Error fetching exchange rates." });
  }
}

module.exports = { getExchangeRates };
