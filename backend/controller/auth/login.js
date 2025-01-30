const bcrypt = require("bcryptjs");
const db = require("../../models/db");  
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const crypto = require("crypto");

const signInLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 7, // Limit to 7 requests
  message: { 
    error: "Too many login attempts", 
    solution: "Please try again after 5 minutes" 
  },
  skipSuccessfulRequests: true
});

const validateJWTConfig = () => {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error("Invalid JWT_SECRET configuration");
  }
};

const signIn = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername?.trim() || !password?.trim()) {
      return res.status(400).json({
        code: "INVALID_CREDENTIALS",
        message: "Both email/username and password are required"
      });
    }

    validateJWTConfig();

    const sanitizedInput = emailOrUsername.trim();
    const passwordInput = password.trim();

    const query = `
      SELECT uid, email, username, password
      FROM users
      WHERE email = ? OR username = ?
    `;
    
    db.query(query, [sanitizedInput, sanitizedInput], async (error, results) => {
      if (error) {
        console.error("DB Error:", error.message, error.stack);
        return res.status(500).json({ code: "DB_ERROR", message: "Authentication service unavailable" });
      }

      if (!results || results.length === 0) {
        return res.status(404).json({ code: "USER_NOT_FOUND", message: "Account not found" });
      }

      const user = results[0];

      if (!user.password) {
        console.error("Missing password hash for user:", user);
        return res.status(500).json({ code: "HASH_ERROR", message: "Password hash missing in database" });
      }

      const isMatch = await bcrypt.compare(passwordInput, user.password);
      if (!isMatch) {
        return res.status(401).json({ code: "INVALID_CREDENTIALS", message: "Incorrect password" });
      }

      const tokenPayload = {
        userUid: user.uid
      };
      console.log("Signing JWT with payload:", tokenPayload);

      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "15m" });

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
    });
  } catch (error) {
    console.error("System Error:", error.message, error.stack);
    return res.status(500).json({ code: "SYSTEM_ERROR", message: "Internal authentication system error" });
  }
};


const logout = async (req, res) => {
  try {
    res.clearCookie("authToken")
       .status(200)
       .json({ success: true, message: "Successfully logged out" });
  } catch (error) {
    res.status(500).json({ code: "LOGOUT_FAILED", message: "Failed to complete logout process" });
  }
};

module.exports = { signIn, logout, signInLimiter };