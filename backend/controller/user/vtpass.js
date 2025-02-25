const pool = require("../../models/db");
const asyncHandler = require("../utils/asyncHandler");
const { checkVtuBalance, rechargeAirtime, getVtuVariations, rechargeData } = require("../utils/vtu");
const { insertVtpassHistory } = require("../utils/history");

/**
 * ✅ Check User Balance from Database Before Processing VTU Transactions
 */
const checkUserBalance = async (userId, amount) => {
    const [rows] = await pool.query("SELECT account_balance FROM users WHERE uid = ?", [userId]);
    
    if (rows.length === 0) return { status: false, message: "User not found" };
    
    const userBalance = rows[0].account_balance;
    return userBalance >= amount
        ? { status: true, balance: userBalance }
        : { status: false, message: "Insufficient Account Balance" };
};

/**
 * ✅ Handles VTU Airtime Purchase
 */
const userVtuAirtimePost = asyncHandler(async (req, res) => {
    const { amount, type, phone, uid } = req.body;
    const userId = req.user?.uid || uid;
    if (!amount || !type || !phone || !userId) return res.status(400).json({ status: false, message: "Missing required fields." });
    
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return res.status(400).json({ status: false, message: "Invalid amount provided." });
    
    const balanceCheck = await checkUserBalance(userId, parsedAmount);
    if (!balanceCheck.status) return res.status(400).json(balanceCheck);
    
    const providerBalance = await checkVtuBalance();
    if (!providerBalance.success || providerBalance.balance < parsedAmount) return res.status(400).json({ status: false, message: "Transaction unable to proceed. Try again later." });
    
    const result = await rechargeAirtime(parsedAmount, type, phone);

    const vtpassTransaction = result?.data?.content?.transactions || {};
    const transactionStatus = vtpassTransaction?.status?.toLowerCase() === "delivered" ? "successful" : "failed";
    const transactionId = vtpassTransaction?.transactionId || "UNKNOWN";
    const responseMessage = result?.data?.response_description || "";

    const transactionData = {
        user_id: userId,
        transaction_id: transactionId,
        purchase_type: "airtime",
        network_provider: vtpassTransaction?.product_name || type,
        phone_number: phone,
        amount: parsedAmount,
        status: transactionStatus,
        response_message: responseMessage,
        data_plan: null,
    };

    insertVtpassHistory(Object.keys(transactionData), Object.values(transactionData), (err) => {
        if (err) console.error(" Error logging transaction:", err);
    });

    if (transactionStatus === "successful") {
        const newBalance = balanceCheck.balance - parsedAmount;
        await pool.query("UPDATE users SET account_balance = ? WHERE uid = ?", [newBalance, userId]);
        return res.status(200).json({ status: true, message: "Airtime purchase successful", data: vtpassTransaction });
    }

    return res.status(400).json({ status: false, message: "Transaction failed. Please try again." });
});

/**
 * ✅ Handles VTU Data Purchase
 */
const userVtuDataPost = asyncHandler(async (req, res) => {
    const { amount, id, type, phone, uid } = req.body;
    const userId = req.user?.uid || uid;
    if (!amount || !id || !type || !phone || !userId) return res.status(400).json({ status: false, message: "Missing required fields." });
    
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return res.status(400).json({ status: false, message: "Invalid amount provided." });
    
    const balanceCheck = await checkUserBalance(userId, parsedAmount);
    if (!balanceCheck.status) return res.status(400).json(balanceCheck);
    
    const providerBalance = await checkVtuBalance();
    if (!providerBalance.success || providerBalance.balance < parsedAmount) return res.status(400).json({ status: false, message: "Transaction unable to proceed. Try again later." });
    
    const result = await rechargeData(id, `${type}-data`, phone);
    console.log(`📤 Provider Response:`, JSON.stringify(result, null, 2));

    return res.status(200).json({ status: true, message: "Data purchase successful", data: result.data.content.transactions });
});

/**
 * ✅ Fetch Available VTU Variations
 */
const userVtuGetVariations = asyncHandler(async (req, res) => {
    try {
        const variations = await getVtuVariations();
        if (!variations || variations.length === 0) return res.status(404).json({ status: false, message: "No variations found." });

        return res.status(200).json({ status: true, message: "Variations retrieved successfully.", data: variations });
    } catch (error) {
        console.error("❌ Error fetching variations:", error);
        return res.status(500).json({ status: false, message: "Failed to fetch variations." });
    }
});

module.exports = {
    userVtuAirtimePost,
    userVtuDataPost,
    userVtuGetVariations,
};
