const pool = require("../../models/db");

// Function to generate a random 10-digit account number starting with 9
const generateAccountNumber = async () => {
  const randomDigits = Math.floor(9000000000 + Math.random() * 1000000000);
  const accountNumber = `${randomDigits}`;

  const [existingAccount] = await pool.promise().query('SELECT * FROM users WHERE account_number = ?', [accountNumber]);

  if (existingAccount.length > 0) {
    return generateAccountNumber(); 
  }
  return accountNumber; 
};

const assignAccountNumberToUser = async (userId) => {
  const accountNumber = await generateAccountNumber();
  await pool.promise().query('UPDATE users SET account_number = ? WHERE uid = ?', [accountNumber, userId]);
  return accountNumber; 
};

module.exports = { generateAccountNumber, assignAccountNumberToUser };
