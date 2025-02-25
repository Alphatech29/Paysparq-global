const pool = require("../../models/db");

exports.getWebSettings = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM website_settings");
        return rows; 
    } catch (error) {
        console.error("Error fetching website settings:", error);
        throw error;
    }
};
