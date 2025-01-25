import React, { useState } from 'react';

const ResolveAccount = () => {
  const [accountName, setAccountName] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const key = ''; // Paystack secret key
  const params = new URLSearchParams(window.location.search);
  const bank = params.get('bankCode'); // Get bank code from URL parameters
  const accnum = params.get('accNum'); // Get account number from URL parameters

  // Check if bankCode or accNum is missing
  if (!bank || !accnum) {
    return <div>Bank code or account number is missing.</div>;
  }

  // Function to resolve account name using Paystack API
  const resolveAccount = async () => {
    setLoading(true);
    setError(null);
    setAccountName(null);

    const url = `https://api.paystack.co/bank/resolve?account_number=${accnum}&bank_code=${bank}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Check if the response status is true
      if (data.status === true) {
        setAccountName(data.data.account_name);
      } else {
        setError('Failed to resolve account information.');
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Call resolveAccount when the component mounts
  React.useEffect(() => {
    resolveAccount();
  }, [bank, accnum]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {accountName && <p>Account Name: {accountName}</p>}
    </div>
  );
};

export default ResolveAccount;
