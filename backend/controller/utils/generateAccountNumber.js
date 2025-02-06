const pool = require("../../models/db");

// Function to generate a random 10-digit account number starting with 9
const generateAccountNumber = async (lastAccountNumber) => {
  let lastNineDigits = lastAccountNumber.toString().slice(1);
  const increment = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  let newAccountNumber = parseInt(lastNineDigits) + increment;
  newAccountNumber = '9' + newAccountNumber.toString().slice(1);
  // Check if the account number already exists in the database
  const [existingAccount] = await pool.promise().query('SELECT * FROM users WHERE account_number = ?', [newAccountNumber]);
  if (existingAccount.length > 0) {
    return generateAccountNumber(lastAccountNumber);
  }
  return newAccountNumber;
};
const assignAccountNumberToUser = async (userId) => {
  // Get the last account number from the database
  const [lastAccount] = await pool.promise().query('SELECT account_number FROM users ORDER BY account_number DESC LIMIT 1');
  const lastAccountNumber = lastAccount.length > 0 ? lastAccount[0].account_number : 9753231920;
  const accountNumber = await generateAccountNumber(lastAccountNumber);
  // Update the user's account number in the database
  await pool.promise().query('UPDATE users SET account_number = ? WHERE uid = ?', [accountNumber, userId]);
  return accountNumber;
};


module.exports = { generateAccountNumber, assignAccountNumberToUser };
