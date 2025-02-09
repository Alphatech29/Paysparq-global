const jwt = require("jsonwebtoken");
const pool = require("../../../models/db");
const validator = require("validator");

const JWT_SECRET = process.env.JWT_SECRET;

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.execute("SELECT * FROM users");
    res.status(200).json({ users });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Get a single user by UID
const getUserById = async (req, res) => {
  const { uid } = req.params;

  try {
    const [user] = await pool.execute("SELECT * FROM users WHERE uid = ?", [uid]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: user[0] });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};


// Update user
const updateUser = async (req, res) => {
  const { uid } = req.params;
  const {
    fullname,
    email,
    username,
    country,
    phone_number,
    date_of_birth,
    bvn_number,
    nin_number,
    address
  } = req.body;

  // Validate fields
  if (email && !validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (phone_number && !validator.isMobilePhone(phone_number, "any")) {
    return res.status(400).json({ message: "Invalid phone number format" });
  }

  if (date_of_birth && !validator.isDate(date_of_birth)) {
    return res.status(400).json({ message: "Invalid date of birth format" });
  }

  if (bvn_number && !/^\d{11}$/.test(bvn_number)) {
    return res.status(400).json({ message: "Invalid BVN format (must be 11 digits)" });
  }

  if (nin_number && !/^\d{11}$/.test(nin_number)) {
    return res.status(400).json({ message: "Invalid NIN format (must be 11 digits)" });
  }

  try {
    // Check if the user exists
    const [userRows] = await pool.execute("SELECT * FROM users WHERE uid = ?", [uid]);

    if (userRows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prepare fields for update dynamically
    const fieldsToUpdate = {};
    Object.entries({ fullname, email, username, country, phone_number, date_of_birth, bvn_number, nin_number, address })
      .forEach(([key, value]) => {
        if (value) fieldsToUpdate[key] = value;
      });

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const setClause = Object.keys(fieldsToUpdate).map(field => `${field} = ?`).join(", ");
    const params = [...Object.values(fieldsToUpdate), uid];

    // Update user data in the database
    const query = `UPDATE users SET ${setClause} WHERE uid = ?`;
    await pool.execute(query, params);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};



// Delete user
const deleteUser = async (req, res) => {
  const { uid } = req.params;

  try {
    // Check if the user exists
    const [user] = await pool.execute("SELECT * FROM users WHERE uid = ?", [uid]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete user from the database
    await pool.execute("DELETE FROM users WHERE uid = ?", [uid]);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

// Middleware for JWT token verification
const verifyTokenMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Access denied, token required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  verifyTokenMiddleware,
};
