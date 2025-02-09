const jwt = require("jsonwebtoken");

const generateToken = (payload, secretKey, expiresIn = "15m") => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

const verifyToken = (token, secretKey) => {
  return jwt.verify(token, secretKey);
};

module.exports = { generateToken, verifyToken };
