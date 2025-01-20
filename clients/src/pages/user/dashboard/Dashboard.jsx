import React from 'react';
import Header from '../../../../components/dashboard/Header';
import SideBar from '../../../../components/dashboard/SideBar';

const Dashboard = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-64">
        <Header />
        <div className="flex-grow">
          Welcome to paysparq
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
