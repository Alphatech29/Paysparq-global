import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../../../components/employees/Header';
import SideBar from '../../../../components/employees/SideBar';
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";


const Dashboard = () => {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideBar />
      <div className="flex flex-col w-full ml-64">
        {/* Header */}
        <Header />
        <div className="flex flex-col text-secondary text-3xl pt-14 px-4">
          {/* KYC Alert */}
          {/*{showAlert && (
            <Alert
              icon={HiInformationCircle}
              onDismiss={() => setShowAlert(false)}
              rounded
              className="bg-primary-600/20 mb-4"
            >
              <h2 className="text-lg font-semibold">Complete your KYC verification</h2>
              <p className="text-sm">
                Complete your KYC verification to secure your account, comply with regulations, and unlock full access.
              </p>
            </Alert>
          )} */}
          {/* Main Content */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
