import iswApi from '@api/isw-api';

async function getBankList() {
  try {
    const response = await iswApi.getBankCode();
    const bankNames = response.data.map(bank => bank.name);
    console.log("Bank List:");
    bankNames.forEach(name => {
      console.log(name);
    });
  } catch (err) {
    console.error("Error fetching bank list:", err);
  }
}

getBankList();
