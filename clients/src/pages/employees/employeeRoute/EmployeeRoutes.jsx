import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../../employees/dasboard/Dashboard';
import DefaultDashboard from '../../employees/dasboard/DefaultDashboard';
import UserList from '../users/userList';
import TradeOrder from '../giftCards/tradeOrder';
import GiftcardList from '../giftCards/giftcardList';
//import Transfer from './../pages/user/transfer/Transfer';
//import AddFund from './../pages/user/funding/AddFund';
//import GiftCard from '../pages/user/giftCard/giftCard';
//import GiftCardOutlet from '../pages/user/giftCard/giftCardOutlet';
//import Referral from './../pages/user/referral/Referral';
//import Buycard from '../pages/user/giftCard/buycard';
//import SellCard from '../pages/user/giftCard/sellCard';


const EmployeeRoutes = () => {
  return (
    <Routes>
      {/* Parent route for User layout */}
      <Route path="/" element={<Dashboard />}>
        {/* Other nested routes */}
        <Route path="dashboard" element={<DefaultDashboard />} />
        <Route path="users" element={<UserList />} />
        <Route path="card-trade" element={<TradeOrder />} />
        <Route path="giftcardlist" element={<GiftcardList/>} />
       

        {/* 
         <Route path="airtime-cash" element={<AirtimeToCash />} />
        <Route path="transfer" element={<Transfer />} />
        <Route path="addfund" element={<AddFund />} />
        
        
        <Route path="giftcard/*" element={<GiftCardOutlet />}>
          <Route index element={<GiftCard  />} />
          <Route path="buy-card" element={<Buycard />} />
          <Route path="sell-card" element={<SellCard/>}/>
        </Route>

        <Route path="reward" element={<Referral />} />
         */}
        

        
      </Route>
    </Routes>
  );
};

export default EmployeeRoutes;
