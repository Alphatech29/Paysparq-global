import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from '../../src/pages/user/dashboard';

const ExchangeRate = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      console.log("Fetching exchange rates...");
      try {
        const response = await axios.get('/api/exchange-rates');
        console.log('Full API Response:', response.data);

        if (response.status === 200 && response.data.rates) {
          setRates(response.data.rates);
        } else {
          setError('No exchange rates data available.');
        }
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        setError(error.response?.data?.message || 'Error fetching exchange rates. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []); // Empty dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (rates.length === 0) {
    return <div>No exchange rates available at the moment.</div>;
  }

  return <Dashboard rates={rates} />;
};

export default ExchangeRate;
