// src/pages/UserPage.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './../pages/user/dashboard/Dashboard'; // Layout
import DefaultDashboard from './../pages/user/dashboard/DefaultDashboard'; // Default content
import AirtimeToCash from './../pages/user/airtimeToCash/AirtimeToCash';
import Transfer from './../pages/user/transfer/Transfer';
import AddFund from './../pages/user/funding/AddFund';
import GiftCard from './../pages/user/giftCard/GiftCard';
import Referral from './../pages/user/referral/Referral';

const UserRoutes = () => {
  return (
    <Routes>
      {/* Parent route for User layout */}
      <Route path="/" element={<Dashboard />}>
        {/* Other nested routes */}
        <Route path="dashboard" element={<DefaultDashboard />} />
        <Route path="airtime-cash" element={<AirtimeToCash />} />
        <Route path="transfer" element={<Transfer />} />
        <Route path="addfund" element={<AddFund />} />
        <Route path="giftcard" element={<GiftCard />} />
        <Route path="reward" element={<Referral />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
