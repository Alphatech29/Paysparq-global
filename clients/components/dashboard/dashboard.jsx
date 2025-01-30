import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../control/AuthContext';

const DashboardLogic = () => {
  const { userUid } = useContext(AuthContext);
  const [userData, setUserData] = useState({ balance: null, fullname: '' });

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
          setUserData({
            balance: userDetails.account_balance,
            reward: userDetails.referral_balance,
            fullname: userDetails.fullname,
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

  return {userData};
};

export default DashboardLogic;
