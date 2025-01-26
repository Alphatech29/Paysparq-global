const bcrypt = require("bcryptjs");
const db = require("../../models/db");  
const validator = require("validator");

const signUp = async (req, res) => {
  try {
    const { fullname, email, username, password, country, phone_number } = req.body;

    // Validate inputs
    if (!fullname || !email || !username || !password || !country || !phone_number) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Check for duplicates (email, username, phone_number)
    db.query(
      `SELECT uid, email, username, phone_number FROM users WHERE email = ? OR username = ? OR phone_number = ?`,
      [email, username, phone_number],
      async (error, results) => {
        if (error) {
          console.error("Database error:", error);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length > 0) {
          // Check if the email, username, or phone_number exists
          for (let user of results) {
            if (user.email === email) {
              return res.status(409).json({ message: "Email is already in use" });
            }
            if (user.username === username) {
              return res.status(409).json({ message: "Username is already taken" });
            }
            if (user.phone_number === phone_number) {
              return res.status(409).json({ message: "Phone number is already registered" });
            }
          }
        }

        // Hash the password
        try {
          const hashedPassword = await bcrypt.hash(password, 10);

          // Insert the new user into the database
          db.query(
            `INSERT INTO users (fullname, email, username, country, phone_number, password) VALUES (?, ?, ?, ?, ?, ?)`,
            [fullname, email, username, country, phone_number, hashedPassword],
            (error, results) => {
              if (error) {
                console.error("Database error:", error);
                return res.status(500).json({ message: "Internal server error" });
              }

              res.status(201).json({
                message: "User created successfully",
                userId: results.insertId,  // This is the auto-generated ID
              });
            }
          );
        } catch (error) {
          console.error("Error hashing password:", error);
          res.status(500).json({ message: "Error hashing password" });
        }
      }
    );
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = signUp;
