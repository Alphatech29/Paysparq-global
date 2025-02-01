import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../control/AuthContext';

const DashboardLogic = () => {
  const { userUid } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [error, setError] = useState('');

  
  const formatBalance = (balance) => {
    return new Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: 2 }).format(balance);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`/api/user/${userUid}`, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000,
        });

        if (response.data?.userDetails) {
          const userDetails = response.data.userDetails;

          const formattedBalance = formatBalance(userDetails.account_balance);

          setUserData({
            uid: userDetails.uid,
            balance: formattedBalance,  
            accountNumber: userDetails.account_number,
            reward: userDetails.referral_balance,
            fullname: userDetails.fullname,
            avatar: userDetails.avatar,
          });
        } else {
          throw new Error('No user details found in the response.');
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
      }
    };

    fetchUserData();
  }, [userUid]);

  return { userData, error };
};

export default DashboardLogic;
