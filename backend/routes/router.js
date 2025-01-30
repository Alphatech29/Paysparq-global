const express = require("express");
const router = express.Router();
const signUp = require("../controller/auth/register");
const { signIn, logout, signInLimiter } = require("../controller/auth/login");
const { getExchangeRates } = require("../controller/user/exchangeRate");
const {  getUserDetails} = require('../controller/user/dashboard');



// Sign-Up route (POST request)
router.post("/auth/register", signUp);

// Sign-In route (POST request with middleware for authentication)
router.post("/auth/login", signIn, logout, signInLimiter);

// Route to get exchange rates
router.get("/exchange-rates", getExchangeRates);

// Route to get the user account balance
router.get("/user/:userUid", getUserDetails);




module.exports = router;
