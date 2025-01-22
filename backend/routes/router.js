const express = require("express");
const router = express.Router();
const signUp = require("../controller/auth/register");
const {signIn, isAuthenticated, logout} = require("../controller/auth/login");

// Sign-Up route
router.post("/auth/register", signUp);
//Sign-In route
router.post("/auth/login", signIn, isAuthenticated, logout);

module.exports = router;
