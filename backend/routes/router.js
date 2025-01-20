const express = require("express");
const router = express.Router();
const signUp = require("../controller/auth/register");

// Sign-up route
router.post("/auth/register", signUp);

module.exports = router;
