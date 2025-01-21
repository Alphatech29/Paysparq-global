const express = require("express");
const router = express.Router();
const signUp = require("../controller/auth/register");
const signIn = require("../controller/auth/login");

// Sign-Up route
router.post("/auth/register", signUp);
//Sign-In route
router.post("/auth/login", signIn);

module.exports = router;
