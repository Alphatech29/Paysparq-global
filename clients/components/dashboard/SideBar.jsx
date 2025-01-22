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
import { AuthContext } from "./../../src/context/authContext";

const SideBar = () => {
  const { authenticated, logout } = useContext(AuthContext); 

  return (
    <div className='bg-paysparq w-64 h-screen fixed flex flex-col items-start justify-start px-4 z-20'>
      <div className='pt-1 pb-5'>
        <a href="/"> 
          <img src="/image/paysparq-logo.png" alt="Footer Logo" className="h-12" />
        </a>
      </div>
      <div className='gap-4 flex flex-col'>
        <span>
          <a href="/user/dashboard" className='flex items-center gap-2 text-secondary text-base hover:bg-primary-600 hover:p-2 hover:rounded-lg hover:text-pay'>
            <HiViewGrid /> <span>Dashboard</span>
          </a>
        </span>

        <Dropdown 
          label={
            <div className="flex items-center space-x-2 text-secondary">
              <HiOutlineAdjustments className="w-5 h-5" />
              <span>Trading Asset</span>
            </div>
          } 
          inline 
          className="bg-pay border-none shadow-none"
        >
          <Dropdown.Item icon={FaBitcoin} className='hover:bg-primary-600 hover:text-paysparq hover:rounded-lg'>
            Crypto Trading
          </Dropdown.Item>
          <Dropdown.Item icon={HiGift} className='hover:bg-primary-600 hover:text-paysparq hover:rounded-lg'>
            Gift Cards Trading
          </Dropdown.Item>
        </Dropdown>

        <Dropdown 
          label={
            <div className="flex items-center space-x-2 text-secondary">
              <HiOutlineRss className="w-5 h-5" />
              <span>Bills & Airtime</span>
            </div>
          } 
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
            Bills Pay
          </Dropdown.Item>
        </Dropdown>

        <Dropdown 
          label={
            <div className="flex items-center space-x-2 text-secondary">
              <MdPayments className="w-5 h-5" />
              <span>Payment</span>
            </div>
          } 
          inline 
          className="bg-pay border-none shadow-none"
        >
          <Dropdown.Item icon={CiBank} className='hover:bg-primary-600 hover:text-paysparq hover:rounded-lg'>
            Withdraw
          </Dropdown.Item>
          <Dropdown.Item icon={IoIosAddCircleOutline} className='hover:bg-primary-600 hover:text-paysparq hover:rounded-lg'>
            Fund Wallet
          </Dropdown.Item>
        </Dropdown>

        <span>
          <a href="/user/history" className='flex items-center gap-2 text-secondary text-base hover:bg-primary-600 hover:p-2 hover:rounded-lg hover:text-pay'>
            <HiOutlineNewspaper /> <span>Transaction History</span>
          </a>
        </span>
        <span>
          <a href="/user/airtime-cash" className='flex items-center gap-2 text-secondary text-base hover:bg-primary-600 hover:p-2 hover:rounded-lg hover:text-pay'>
            <HiArrowsExpand /> <span>Airtime to cash</span>
          </a>
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

        <Dropdown 
          label={
            <div className="flex items-center space-x-2 text-secondary">
              <HiCog className="w-5 h-5" />
              <span>Settings</span>
            </div>
          } 
          inline 
          className="bg-pay border-none shadow-none"
        >
          <Dropdown.Item icon={MdManageAccounts} className='hover:bg-primary-600 hover:text-paysparq hover:rounded-lg'>
            Account Settings
          </Dropdown.Item>
          <Dropdown.Item
            icon={HiLogout}
            onClick={authenticated ? logout : null}
          >
            Sign out
          </Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
};

export default SideBar;