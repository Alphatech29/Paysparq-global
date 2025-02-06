const db = require("../../models/db");
const crypto = require("crypto");

// Function to generate a unique permanent referral code for each user
const generateReferralCode = (userId) => {
  // Use userId and a hashing function to generate a permanent code
  const referralCode = crypto.createHash('sha256').update(userId).digest('hex').slice(0, 6).toUpperCase();
  return referralCode;
};

// Function to generate the referral link
const generateReferralLink = (userId) => {
  const registrationUrl = process.env.REGISTRATION_URL;
  const referralCode = generateReferralCode(userId); // Generate permanent referral code based on userId
  const referralLink = `${process.env.BASE_URL}${registrationUrl}?referralCode=${referralCode}`;
  return { referralCode, referralLink };
};

// Function to get user data including referral code
const getUserData = (userId) => {
  try {
    // Generate the referral code and link
    const { referralCode, referralLink } = generateReferralLink(userId);

    // You can also get other user data here if necessary (e.g., username, email, etc.)
    return { referralCode, referralLink };
  } catch (error) {
    console.error("Error in getUserData:", error);
    return { message: "Internal server error" };
  }
};

// Function to credit the referrer when a new user registers
const creditReferrer = async (userId, referralCode) => {
  try {
    // Check if the referral code is valid
    const [referrer] = await db.promise().query(
      `SELECT * FROM users WHERE referral_code = ?`,
      [referralCode]
    );

    if (!referrer) {
      return { message: "Invalid referral code" };
    }

    // Logic to credit the referrer with a bonus
    const referralBonus = 5.00; // Example bonus amount
    await db.promise().query(
      `UPDATE users SET referral_balance = referral_balance + ? WHERE uid = ?`,
      [referralBonus, referrer.uid]
    );

    return { message: "Referrer credited successfully", referrer };
  } catch (error) {
    console.error("Error in creditReferrer:", error);
    return { message: "Internal server error" };
  }
};

// Export functions
module.exports = {
  generateReferralLink,
  getUserData,
  creditReferrer
};
