const express = require("express");
const employeesRoute = express.Router();
const { login } = require("../controller/admin/auth/auth");
const {  getAllUsers, getUserById, updateUser, deleteUser } = require("../controller/admin/dashbord/users");
const { approveTrade, getAllGiftCardHistory } = require("../controller/admin/dashbord/giftcardOrder")
const { getAllExchangeRates,deleteCard, createCard, createExchangeRate,getAllGiftCards, editExchangeRate  } = require("../controller/admin/dashbord/giftcardExchangeRate")

// ------- Authentication ---------//
employeesRoute.post("/office/login", login);

// -----------Get all users route-----------//
employeesRoute.get("/users", getAllUsers);
employeesRoute.get("/users/:uid", getUserById);
employeesRoute.put("/users/:uid", updateUser);
employeesRoute.delete("/users/:uid", deleteUser);

// Admin route to approve or reject a trade
employeesRoute.put('/approve-trade', approveTrade);

//------------ Route to all gift card ----------//
employeesRoute.get('/gift-card-history', getAllGiftCardHistory);
employeesRoute.get('/giftcard-rate', getAllExchangeRates ,getAllGiftCards);
employeesRoute.get('/gift-cards',getAllGiftCards);
employeesRoute.delete('/giftcard-rate/:cardId', deleteCard);
employeesRoute.post('/createCard', createCard);
employeesRoute.post('/new-rate',  createExchangeRate)
employeesRoute.put('/rate-edit/:id', editExchangeRate ) 


module.exports = employeesRoute;
