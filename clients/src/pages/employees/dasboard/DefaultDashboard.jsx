import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { useEmployeeAuth } from "../../../../components/control/EmployeeAuthContext"; 
import { getAllUsers } from "../../../../components/employees/dashboard/usersApi";

const DefaultDashboard = () => {
  const { employeeDetails } = useEmployeeAuth();
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0); 


  useEffect(() => {
    // Function to fetch users and calculate total balance and count
    const fetchUsersAndCalculateBalance = async () => {
      try {
        // Fetch all users from the API
        const response = await getAllUsers();
        const users = response.users || [];
        // Calculate the total balance by summing all users' account_balance
        const total = users.reduce((accum, user) => accum + parseFloat(user.account_balance || 0), 0);
        // Set the total balance and total users
        setTotalBalance(total);
        setTotalUsers(users.length);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersAndCalculateBalance();
  }, []);

  return (
    <div>
      <div>
        <span className="text-xl">Welcome Back!</span>
        <h2 className="text-base">{employeeDetails?.fullname || "N/A"}</h2>
      </div>
      <div className="flex w-full gap-4">
        <div className="bg-primary-600  px-4 py-5 rounded-lg mt-3 text-paysparq justify-center items-start flex flex-col shadow-md shadow-primary-600">
          <div>
            <span className="text-base">Overall Users Balance</span>
            <h2 className="text-3xl">
              <strong>₦{totalBalance.toLocaleString()}</strong> 
            </h2>
          </div>
        </div>

        <div className="bg-pay  px-4 py-5 rounded-lg mt-3 text-primary-600 justify-center items-start flex flex-col shadow-md shadow-primary-600">
          <div className="flex justify-center items-center gap-7">
          <span className="text-4xl bg-primary-600/35 rounded-full px-3 py-3"><FaUsers/></span>
          <div className="flex justify-center items-center flex-col">
            <span className="text-base">Total Users</span>
            <h2 className="text-3xl">
              <strong> <strong>{totalUsers}</strong></strong> 
            </h2>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultDashboard;
