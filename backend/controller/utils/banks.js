
const iswApi = require('@api/isw-api'); 

async function getBankList(req, res) {
  try {
    // Fetch the bank data from the iswApi
    const response = await iswApi.getBankCode();
    
    // Extract bank names from the response
    const bankNames = response.data.map(bank => bank.name);
    
    // Return the bank names as a JSON response
    res.json({ banks: bankNames });
  } catch (err) {
    // Return an error response if something goes wrong
    console.error("Error fetching bank list:", err);
    res.status(500).json({ error: "Error fetching bank list", details: err.message });
  }
}

module.exports = getBankList;
