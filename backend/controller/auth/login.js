const bcrypt = require("bcryptjs");
const supabase = require("../../models/supaBase/supaBaseClient");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");

const signInLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later.",
});

const signIn = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    if (!emailOrUsername || !password) {
      return res.status(400).json({ message: "Email/Username and password are required" });
    }

    const sanitizedEmailOrUsername = emailOrUsername.trim();

    signInLimiter(req, res, async () => {
      const { data: user, error } = await supabase
        .from("users")
        .select("id, email, username, password")
        .or(`email.eq.${sanitizedEmailOrUsername},username.eq.${sanitizedEmailOrUsername}`)
        .maybeSingle();

      if (error || !user) {
        return res.status(404).json({ message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        message: "Login successful",
        redirectUrl: "/user/dashboard",
        token, // Send token for frontend storage
        user: { id: user.id, email: user.email, username: user.username },
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  const token = req.cookies.authToken; // Retrieve token from cookies
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Logout function to clear cookies
const logout = (req, res) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "Logout successful" });
};

module.exports = { signIn, isAuthenticated, logout };
