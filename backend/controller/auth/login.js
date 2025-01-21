const bcrypt = require("bcryptjs");
const supabase = require("../../models/supaBase/supaBaseClient");
const jwt = require("jsonwebtoken");
const rateLimit = require('express-rate-limit');



const signInLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later.",
});

const signIn = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res.status(400).json({ message: "Email or Username and password are required" });
    }

    const sanitizedEmailOrUsername = emailOrUsername.trim(); 

    signInLimiter(req, res, async () => {
      const { data: user, error } = await supabase
        .from("users")
        .select("id, email, username, password")
        .or(`email.eq.${sanitizedEmailOrUsername},username.eq.${sanitizedEmailOrUsername}`)
        .maybeSingle();
      if (error) {
        return res.status(500).json({ message: "Error fetching user" });
      }

      if (!user) {
        return res.status(404).json({ message: "User not found" });
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

      res.status(200).json({
        message: "Login successful",
        token,
        user: { id: user.id, email: user.email, username: user.username },
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = signIn;
