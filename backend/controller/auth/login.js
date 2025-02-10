const bcrypt = require("bcryptjs");
const pool = require("../../models/db");  // Import the pool
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const crypto = require("crypto");

// Rate limiter for sign-in attempts
const signInLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 7, // Limit to 7 requests
  message: {
    error: "Too many login attempts",
    solution: "Please try again after 5 minutes"
  },
  skipSuccessfulRequests: true
});

// Validate JWT Secret environment variable
const validateJWTConfig = () => {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error("Invalid JWT_SECRET configuration");
  }
};

// Sign-in handler
const signIn = async (req, res) => {
  try {
    console.log("SignIn attempt:", req.body); // Log incoming request

    const { emailOrUsername, password } = req.body;

    // Check for missing credentials
    if (!emailOrUsername?.trim() || !password?.trim()) {
      return res.status(400).json({
        code: "INVALID_CREDENTIALS",
        message: "Both email/username and password are required"
      });
    }

    validateJWTConfig(); // Ensure JWT_SECRET is configured

    const sanitizedInput = emailOrUsername.trim();
    const passwordInput = password.trim();

    // Database query to fetch user by email or username
    const query = `
      SELECT uid, email, username, password
      FROM users
      WHERE email = ? OR username = ?
    `;
    
    console.log("Executing DB query...");
    const [results] = await pool.query(query, [sanitizedInput, sanitizedInput]);
    console.log("DB query results:", results);

    if (!results || results.length === 0) {
      return res.status(404).json({ code: "USER_NOT_FOUND", message: "Account not found" });
    }

    const user = results[0];

    // Handle missing password hash in DB
    if (!user.password) {
      console.error("Missing password hash for user:", user);
      return res.status(500).json({ code: "HASH_ERROR", message: "Password hash missing in database" });
    }

    // Compare password with hash in DB
    const isMatch = await bcrypt.compare(passwordInput, user.password);
    if (!isMatch) {
      return res.status(401).json({ code: "INVALID_CREDENTIALS", message: "Incorrect password" });
    }

    // Generate JWT token
    const tokenPayload = {
      userUid: user.uid
    };
    console.log("Signing JWT with payload:", tokenPayload);

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "15m" });

    // Return response with user details and token
    return res.status(200).json({
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        username: user.username
      },
      tokenMetadata: {
        expiresIn: 900
      },
      token: token
    });
  } catch (error) {
    console.error("System Error:", error.message, error.stack);
    return res.status(500).json({ code: "SYSTEM_ERROR", message: "Internal authentication system error", details: error.message });
  }
};

module.exports = { signIn, signInLimiter };
