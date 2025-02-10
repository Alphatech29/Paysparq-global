const express = require("express");
const employeesRoute = express.Router();
const { login } = require("../controller/admin/auth/auth");
const {  getAllUsers, getUserById, updateUser, deleteUser } = require("../controller/admin/dashbord/users");
const { approveTrade, getAllGiftCardHistory } = require("../controller/admin/dashbord/giftcardOrder")

// Sign-In route (POST request with middleware for authentication)
employeesRoute.post("/office/login", login);

// Get all users route (GET request)
employeesRoute.get("/users", getAllUsers);

// Get a single user by UID (GET request)
employeesRoute.get("/users/:uid", getUserById);

// Update user route (PUT request)
employeesRoute.put("/users/:uid", updateUser);

// Delete user route (DELETE request)
employeesRoute.delete("/users/:uid", deleteUser);

// Route to get all gift card transaction history
employeesRoute.get('/gift-card-history', getAllGiftCardHistory);

// Admin route to approve or reject a trade
employeesRoute.put('/approve-trade', approveTrade);

module.exports = employeesRoute;
