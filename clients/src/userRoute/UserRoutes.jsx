// src/pages/UserPage.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './../pages/user/dashboard/Dashboard';
import AirtimeToCash from "./../pages/user/airtimeToCash/AirtimeToCash";
import Withdrawal from "./../pages/user/withdrawal/Withdrawal";
import AddFund from "./../pages/user/funding/AddFund";

const UserRoutes = () => {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={
            <Dashboard />
        }
      />
      <Route path="*" element={<Dashboard />}>
      <Route
        path="airtime-cash"
        element={
            <AirtimeToCash />
        }
      />
       <Route
        path="withdrawal"
        element={
            <Withdrawal />
        }
      />
       <Route
        path="addfund"
        element={
            <AddFund />
        }
      />
</Route>
    </Routes>
  );
};

export default UserRoutes;
