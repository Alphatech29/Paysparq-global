import React, { useContext } from "react";
import { Dropdown } from "flowbite-react";
import { 
  HiViewGrid, HiGift, HiOutlineAdjustments, HiOutlineRss, HiOutlineWifi, 
  HiOutlineDeviceMobile, HiOutlineClipboardList, HiOutlineNewspaper, 
  HiLogout, HiCog, HiArrowsExpand 
} from "react-icons/hi";
import { FaBitcoin } from "react-icons/fa";
import { CiCreditCard1, CiBank } from "react-icons/ci";
import { MdManageAccounts, MdOutlineAccountTree, MdPayments } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { NavLink } from 'react-router-dom'; 
import { AuthContext } from '../control/AuthContext'; 

const SideBar = () => {
  const { logout } = useContext(AuthContext);


  return (
    <div className='bg-paysparq w-64 h-screen fixed flex flex-col items-start justify-start px-4 z-20'>
      {/* Logo Section */}
      <div className='pt-1 pb-5'>
        <a href="/"> 
          <img src="/image/paysparq-logo.png" alt="Footer Logo" className="h-12" />
        </a>
      </div>

      {/* Sidebar Navigation */}
      <div className='gap-4 flex flex-col'>
        {/* Dashboard Link */}
        <span>
          <NavLink 
            to="/user/dashboard" 
            className='flex items-center gap-2 text-secondary text-base hover:bg-primary-600 hover:p-2 hover:rounded-lg hover:text-pay'
          >
            <HiViewGrid /> <span>Dashboard</span>
          </NavLink>
        </span>

        {/* Trading Asset Dropdown */}
        <Dropdown 
          label={(
            <div className="flex items-center space-x-2 text-secondary">
              <HiOutlineAdjustments className="w-5 h-5" />
              <span>Trading Asset</span>
            </div>
          )} 
          inline 
          className="bg-pay border-none shadow-none"
        >
          <Dropdown.Item icon={FaBitcoin} className='hover:bg-primary-600 hover:text-paysparq hover:rounded-lg'>
            Crypto Trading
          </Dropdown.Item>
          <Dropdown.Item icon={HiGift} className='hover:bg-primary-600 hover:text-paysparq hover:rounded-lg'>
            <NavLink to='/user/giftcard'>Gift Cards Trading</NavLink>
          </Dropdown.Item>
        </Dropdown>

        {/* Bills & Airtime Dropdown */}
        <Dropdown 
          label={(
            <div className="flex items-center space-x-2 text-secondary">
              <HiOutlineRss className="w-5 h-5" />
              <span>Bills & Airtime</span>
            </div>
          )} 
          inline 
          className="bg-pay border-none shadow-none"
        >
          <Dropdown.Item icon={HiOutlineDeviceMobile} className='hover:bg-primary-600 hover:text-paysparq hover:rounded-lg'>
            Airtime TopUp
          </Dropdown.Item>
          <Dropdown.Item icon={HiOutlineWifi} className='hover:bg-primary-600 hover:text-paysparq hover:rounded-lg'>
            Data Topup
          </Dropdown.Item>
          <Dropdown.Item icon={HiOutlineClipboardList} className='hover:bg-primary-600 hover:text-paysparq hover:rounded-lg'>
            Pay Bills
          </Dropdown.Item>
        </Dropdown>

        {/* Payment Dropdown */}
        <Dropdown 
          label={(
            <div className="flex items-center space-x-2 text-secondary">
              <MdPayments className="w-5 h-5" />
              <span>Transfer</span>
            </div>
          )} 
          inline 
          className="bg-pay border-none shadow-none"
        >
          <Dropdown.Item icon={CiBank} className='hover:bg-primary-600 hover:text-paysparq hover:rounded-lg'>
            <NavLink to="/user/paysparq">Paysparq</NavLink>
          </Dropdown.Item>
          <Dropdown.Item icon={CiBank} className='hover:bg-primary-600 hover:text-paysparq hover:rounded-lg'>
            <NavLink to="/user/other-bank">Other-Bank</NavLink>
          </Dropdown.Item>
        </Dropdown>

        {/* Other Navigation Links */}
        <span>
          <a href="/user/history" className='flex items-center gap-2 text-secondary text-base hover:bg-primary-600 hover:p-2 hover:rounded-lg hover:text-pay'>
            <HiOutlineNewspaper /> <span>Transaction History</span>
          </a>
        </span>
        <span>
          <NavLink 
            to="/user/airtime-cash" 
            className='flex items-center gap-2 text-secondary text-base hover:bg-primary-600 hover:p-2 hover:rounded-lg hover:text-pay'
          >
            <HiArrowsExpand /> <span>Airtime to cash</span>
          </NavLink>
        </span>
        <span>
          <a href="/user/card" className='flex items-center gap-2 text-secondary text-base hover:bg-primary-600 hover:p-2 hover:rounded-lg hover:text-pay'>
            <CiCreditCard1 /> <span>Card</span>
          </a>
        </span>
        <span>
          <a href="/user/account" className='flex items-center gap-2 text-secondary text-base hover:bg-primary-600 hover:p-2 hover:rounded-lg hover:text-pay'>
            <MdOutlineAccountTree /> <span>Accounts</span>
          </a>
        </span>
        <span>
          <a href="/user/reward" className='flex items-center gap-2 text-secondary text-base hover:bg-primary-600 hover:p-2 hover:rounded-lg hover:text-pay'>
            <HiGift /> <span>Rewards</span>
          </a>
        </span>

        {/* Settings Dropdown */}
        <Dropdown 
          label={(
            <div className="flex items-center space-x-2 text-secondary">
              <HiCog className="w-5 h-5" />
              <span>Settings</span>
            </div>
          )} 
          inline 
          className="bg-pay border-none shadow-none"
        >
          <Dropdown.Item icon={MdManageAccounts} className='hover:bg-primary-600 hover:text-paysparq hover:rounded-lg'>
            Account Settings
          </Dropdown.Item>
          <Dropdown.Item
            icon={HiLogout}
            onClick={logout} 
          >
            Sign out
          </Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
};

export default SideBar;
