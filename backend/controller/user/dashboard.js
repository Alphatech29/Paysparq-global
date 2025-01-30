const db = require('../../models/db');

// Function to get all user details from the database
const getUserDetails = (req, res) => {
  const userUid = req.params.userUid;
  //console.log(`Fetching details for user UID: ${userUid}`);
  
  if (!userUid) {
    console.warn('User UID not provided in request.');
    return res.status(400).json({ error: 'User UID is required.' });
  }
  
  // SQL query to select all columns from the users table where the UID matches
  db.query('SELECT * FROM users WHERE uid = ?', [userUid], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Something went wrong. Database error.' });
    }
    if (result.length > 0) {
      //console.log(`User details retrieved for UID ${userUid}:`, result[0]);
      res.json({ userDetails: result[0] });  
    } else {
      console.warn(`User with UID ${userUid} not found.`);
      res.status(404).json({ error: 'User not found' });
    }
  });
};

module.exports = { getUserDetails };
