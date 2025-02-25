const express = require("express");
const router = express.Router();
const signUp = require("../controller/auth/register");
const { signIn } = require("../controller/auth/login");
const { getExchangeRates } = require("../controller/user/exchangeRate");
const { getUserDetails } = require('../controller/user/dashboard');
const { handleTransfer, getUserFullName } = require('../controller/user/transfer');
const { handleDepositRequest } = require('../controller/utils/deposit');
const { getUserTransactions } = require('../controller/user/transactionHistory');
const { getCardDetailsWithExchangeRates, submitCardDetails } = require('../controller/user/giftcards/giftcards');
const { getUserGiftcardHistory } = require('../controller/user/giftcards/giftcardHistory');
const { userVtuAirtimePost, userVtuDataPost, userVtuGetVariations } = require("../controller/user/vtpass");

// Sign-Up route
router.post("/auth/register", signUp);

// Sign-In route
router.post("/auth/login", signIn);

// Get exchange rates
router.get("/exchange-rates", getExchangeRates);

// Get user account balance
router.get("/user/:userUid", getUserDetails);

// Handle transfer
router.post("/transfer", handleTransfer); 
router.get("/transfer", getUserFullName);

// Handle fund deposit
router.post('/deposit', handleDepositRequest);

// Fetch transactions for a specific user
router.get('/transactions/:userId', getUserTransactions);

// Fetch all card details with exchange rates
router.get("/card-details", getCardDetailsWithExchangeRates); 
router.post("/submit_card_details", submitCardDetails);

// Get all giftcard history
router.get('/giftcard-history/:userUid', getUserGiftcardHistory);

//-------- VTU Service Routes (Ensures User Balance Check) --------//
router.post("/vtu/airtime", userVtuAirtimePost);
router.post("/vtu/data", userVtuDataPost);
router.get("/vtu/variations", userVtuGetVariations);

module.exports = router;
