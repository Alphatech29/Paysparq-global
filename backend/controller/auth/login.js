const bcrypt = require("bcryptjs");
const supabase = require("../../models/supaBase/supaBaseClient");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");

// Middleware to limit login attempts
const signInLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 5, 
  message: "Too many login attempts, please try again later.",
});

const signIn = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    if (!emailOrUsername || !password) {
      return res
        .status(400)
        .json({ message: "Email or Username and password are required" });
    }

    const sanitizedEmailOrUsername = emailOrUsername.trim();

    // Supabase query with correct column names
    const query = `email.eq.${sanitizedEmailOrUsername},username.eq.${sanitizedEmailOrUsername}`;
    const { data: user, error } = await supabase
      .from("p_users")
      .select("uid, email, username, password")
      .or(query)
      .maybeSingle();

    if (error) {
      console.error("Supabase query error:", error.message || error);
      return res.status(500).json({ message: "Database query failed" });
    }

    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in the environment variables.");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign(
      { userUid: user.uid, email: user.email, username: user.username }, // 
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      message: "Login successful",
      redirectUrl: "/user/dashboard",
      token, // Send token for frontend storage
      user: { uid: user.uid, email: user.email, username: user.username },
    });
  } catch (error) {
    console.error("Sign-in error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Logout function to clear cookies
const logout = (req, res) => {
  res.clearCookie("authToken");
  return res.status(200).json({ message: "Logout successful" });
};

module.exports = { signIn, isAuthenticated, logout, signInLimiter };
