const express = require("express");
const router = express.Router();
const signUp = require("../controller/auth/register");
const { signIn, isAuthenticated, logout } = require("../controller/auth/login");
const { getExchangeRates } = require("../controller/user/exchangeRate");


// Sign-Up route (POST request)
router.post("/auth/register", signUp);

// Sign-In route (POST request with middleware for authentication)
router.post("/auth/login", signIn, isAuthenticated, logout);

// Route to get exchange rates
router.get("/exchange-rates", getExchangeRates);


module.exports = router;
