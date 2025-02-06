const express = require("express");
const router = express.Router();
const signUp = require("../controller/auth/register");
const { signIn, logout, signInLimiter } = require("../controller/auth/login");
const { getExchangeRates } = require("../controller/user/exchangeRate");
const { getUserDetails } = require('../controller/user/dashboard');
const { handleTransfer, getUserFullName } = require('../controller/user/transfer');
const { handleDepositRequest } = require('../controller/utils/deposit');
const { getUserTransactions } = require('../controller/user/transactionHistory');
const { getCardDetailsWithExchangeRates,submitCardDetails } = require('../controller/user/giftcards/giftcards');
const { getUserGiftcardHistory } = require('../controller/user/giftcards/giftcardHistory')  

// Sign-Up route (POST request)
router.post("/auth/register", signUp);

// Sign-In route (POST request with middleware for authentication)
router.post("/auth/login", signIn, logout, signInLimiter);

// Route to get exchange rates
router.get("/exchange-rates", getExchangeRates);

// Route to get the user account balance
router.get("/user/:userUid", getUserDetails);

// Route to handle transfer
router.post("/transfer", handleTransfer); 
router.get("/transfer", getUserFullName);

// Route to handle fund deposit
router.post('/deposit', handleDepositRequest);

// Route to fetch transactions for a specific user
router.get('/transactions/:userId', getUserTransactions);

// Route to fetch all card details with exchange rates
router.get("/card-details", getCardDetailsWithExchangeRates); router.post("/submit_card_details", submitCardDetails);

//Route to get all giftcard history
router.get('/giftcard-history/:userUid', getUserGiftcardHistory);


module.exports = router;
