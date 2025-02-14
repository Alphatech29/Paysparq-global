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
import { FaUsers } from "react-icons/fa6";
import { NavLink } from 'react-router-dom'; 
import { EmployeeAuthContext } from '../control/EmployeeAuthContext'; 
import GiftCard from "./../../src/pages/user/giftCard/giftCard";

const SideBar = () => {
  const { signOutEmployee } = useContext(EmployeeAuthContext); 

  const handleLogout = () => {
    signOutEmployee();  
  };

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
            to="/office/dashboard" 
            className='flex items-center gap-2 text-secondary text-base hover:bg-primary-600 hover:p-2 hover:rounded-lg hover:text-pay'
          >
            <HiViewGrid /> <span>Dashboard</span>
          </NavLink>
        </span>
        <Dropdown 
                 label={(
                   <div className="flex items-center space-x-2 text-secondary">
                     <HiGift className="w-5 h-5" />
                     <span>GiftCard Management</span>
                   </div>
                 )} 
                 inline 
                 className="bg-pay border-none shadow-none"
               >
                 <Dropdown.Item className='hover:bg-primary-600 hover:text-paysparq hover:rounded-lg'>
                   <NavLink to='/office/giftcardlist'>Gift Cards</NavLink>
                 </Dropdown.Item>
                 <Dropdown.Item className='hover:bg-primary-600 hover:text-paysparq hover:rounded-lg'>
                   <NavLink to='/office/card-trade'>Order Tracking</NavLink>
                 </Dropdown.Item>
               </Dropdown>
       

        
        <span>
          <NavLink 
            to="/office/users" 
            className='flex items-center gap-2 text-secondary text-base hover:bg-primary-600 hover:p-2 hover:rounded-lg hover:text-pay'
          >
            <FaUsers /> <span>User Management</span>
          </NavLink>
        </span>

        <span>
          <a href="/user/history" className='flex items-center gap-2 text-secondary text-base hover:bg-primary-600 hover:p-2 hover:rounded-lg hover:text-pay'>
            <HiOutlineNewspaper /> <span>Transaction History</span>
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
            onClick={handleLogout}
          >
            Sign out
          </Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
};

export default SideBar;
