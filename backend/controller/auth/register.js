const bcrypt = require("bcryptjs");
const db = require("../../models/db");
const validator = require("validator");
const { assignAccountNumberToUser } = require('../../controller/utils/generateAccountNumber');
const { generateReferralLink, creditReferrer } = require('../../controller/utils/referral');

const signUp = async (req, res) => {
  try {
    const { fullname, email, username, password, country, phone_number, referralCode } = req.body;

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
    const [results] = await db.promise().query(
      `SELECT uid, email, username, phone_number FROM users WHERE email = ? OR username = ? OR phone_number = ?`,
      [email, username, phone_number]
    );

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
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate the unique account number first before inserting into DB
    const accountNumber = await assignAccountNumberToUser();

    // Generate the referral link using the username
    const referralLink = generateReferralLink(username);  // Get referral link

    // Set default values for avatar, account_balance, and referral_balance
    const avatar = 'https://www.marktechpost.com/wp-content/uploads/2023/05/7309681-scaled.jpg';
    const account_balance = 0.00;
    const referral_balance = 0.00;

    // Insert the new user into the database
    const [insertResult] = await db.promise().query(
      `INSERT INTO users (fullname, email, username, country, phone_number, password, account_number, avatar, account_balance, referral_balance, referral_code) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [fullname, email, username, country, phone_number, hashedPassword, accountNumber, avatar, account_balance, referral_balance, referralLink]
    );

    // If a referral code is provided and valid, credit the referrer
    if (referralCode) {
      const referralResponse = await creditReferrer(insertResult.insertId, referralCode);
      if (referralResponse.message !== "Referrer credited successfully") {
        return res.status(400).json({ message: referralResponse.message });
      }
    }

    // Return the successful response with the referral link
    res.status(201).json({
      message: "User created successfully",
      userId: insertResult.insertId,
      accountNumber: accountNumber,
      referralLink: referralLink,  // Return dynamic referral link
      avatar: avatar,
      account_balance: account_balance,
      referral_balance: referral_balance,
    });

  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = signUp;
