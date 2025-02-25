const pool = require("../../models/db");


const getWebsiteSettings = async (req, res) => {
  try {
    if (!pool) {
      throw new Error("Database connection not initialized");
    }

    const result = await pool.query("SELECT * FROM website_settings");
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No website settings found" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching website settings:", error.message || error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Export the function
module.exports = getWebsiteSettings;
