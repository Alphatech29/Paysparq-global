import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from '../../../../components/dashboard/Header';
import SideBar from '../../../../components/dashboard/SideBar';
import { HiInformationCircle } from "react-icons/hi";
import { Alert, Table } from "flowbite-react";
import { FaDollarSign, FaExchangeAlt } from "react-icons/fa";
import { IoPhonePortrait } from "react-icons/io5";
import { MdCurrencyExchange } from "react-icons/md";
import { FaBitcoin } from "react-icons/fa6";

// Assuming 'rates' is an array passed to Dashboard
const Dashboard = ({ rates }) => {
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
          {showAlert && (
            <Alert
              icon={HiInformationCircle}
              onDismiss={() => setShowAlert(false)}
              rounded
              className="bg-primary-600/20"
            >
              <h2 className="text-lg font-semibold">Complete your KYC verification</h2>
              <p className="text-sm">
                Complete your KYC verification to secure your account, comply with regulations, and unlock full access.
              </p>
            </Alert>
          )}
          {/* Main Content */}
          <div className="content mt-4 pb-10">
            <Routes>
              <Route path="/" element={<DefaultDashboard rates={rates} />} />
            </Routes>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

// DefaultDashboard Component with passed rates prop
const DefaultDashboard = ({ rates = [] }) => {
  const formatCurrency = (currencyName, amount) => {
    // Format amount to currency, fallback to 'USD' if currencyName is invalid
    const options = { style: 'currency', currency: currencyName || 'USD' };
    try {
      return new Intl.NumberFormat('en-US', options).format(amount);
    } catch (error) {
      return amount; // Return raw amount if currency formatting fails
    }
  };

  return (
    <div>
      <div>
        <span className="text-xl">Welcome Back!</span>
        <h2 className="text-base">Paysparq Limited</h2>
      </div>
      <div className="flex w-full gap-4">
        {/* Balance Section */}
        <div className="bg-primary-600 w-[40%] px-4 py-3 rounded-lg mt-3 text-paysparq justify-center items-start flex flex-col shadow-md shadow-primary-600 relative">
          <FaDollarSign className="absolute left-[70%] top-0 inset-0 text-[150px] blur-lg text-paysparq" />
          <div>
            <span className="text-base">Balance</span>
            <h2 className="text-3xl">
              <strong>{formatCurrency('USD', 100000)}</strong>
            </h2>
          </div>
          <hr className="w-full border--1 border-pay/50 mt-4" />
          <div className="mt-4">
            <span className="text-base">ACCOUNT NUMBER</span>
            <h2 className="text-sm">
              <strong>7395285394</strong>
            </h2>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="bg-pay px-7 py-3 rounded-lg mt-3 justify-center items-start flex flex-col shadow-md shadow-primary-600/50">
          <h1 className="text-base text-center w-full pb-3">Quick Actions</h1>
          <div className="flex px-5 gap-3">
            <div className="gap-2 flex flex-col">
              <div className="flex gap-4 items-center justify-center bg-primary-600/15 rounded-sm p-4">
                <MdCurrencyExchange className="text-2xl" />
                <span className="text-base">Exchange Currency</span>
              </div>
              <div className="flex gap-4 items-center justify-center bg-primary-600/15 rounded-sm p-4">
                <FaBitcoin className="text-2xl" />
                <span className="text-base">Trading Asset</span>
              </div>
            </div>
          </div>
        </div>

        {/* Frequent Payments Section */}
        <div className="bg-pay px-7 py-3 rounded-lg mt-3 justify-center items-start flex flex-col shadow-md shadow-primary-600/50">
          <h1 className="text-base text-center w-full pb-3">Frequent Payments</h1>
          <div className="flex gap-3">
            <div className="gap-2 flex flex-col">
              <div className="flex flex-col items-center justify-center bg-primary-600/15 rounded-sm p-4">
                <IoPhonePortrait className="text-2xl" />
                <span className="text-sm">0 Trading</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-primary-600/15 rounded-sm p-4">
                <IoPhonePortrait className="text-2xl" />
                <span className="text-sm">0 Airtime</span>
              </div>
            </div>
            <div className="gap-2 flex flex-col items-center justify-center bg-primary-600/15 rounded-sm p-10">
              <FaExchangeAlt />
              <span className="text-base">0 Transfer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Exchange Rates Table */}
      <div className="overflow-x-auto mt-6 shadow-md shadow-primary-600/50 rounded-lg bg-pay">
        <h1 className="py-2 text-lg pl-2 text-secondary">Exchange Rate</h1>
        <Table hoverable className="bg-pay">
          <Table.Head className="text-secondary bg-pay">
            <Table.HeadCell className='text-secondary bg-pay'>Currency</Table.HeadCell>
            <Table.HeadCell className='text-secondary bg-pay'>Buying</Table.HeadCell>
            <Table.HeadCell className='text-secondary bg-pay'>Selling</Table.HeadCell>
            <Table.HeadCell className='text-secondary bg-pay'>Last Update</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {rates.length > 0 ? (
              rates.map((rate, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{rate.currency_name}</Table.Cell>
                  <Table.Cell>{formatCurrency(rate.currency_name, rate.buying_rate)}</Table.Cell>
                  <Table.Cell>{formatCurrency(rate.currency_name, rate.selling_rate)}</Table.Cell>
                  <Table.Cell>{new Date(rate.lastUpdate).toLocaleString()}</Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="4" className="text-center text-secondary">
                  No exchange rates available
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>

      {/* Transaction History */}
      <div className="overflow-x-auto mt-6 shadow-md shadow-primary-600/50 rounded-lg bg-pay">
      <h1 className="py-2 text-lg pl-2 text-secondary">Transaction</h1>
  <Table hoverable className='bg-pay'>
    <Table.Head className='text-secondary bg-pay'>
      <Table.HeadCell className='bg-pay'>Transaction ID</Table.HeadCell>
      <Table.HeadCell className='text-secondary bg-pay'>Date</Table.HeadCell>
      <Table.HeadCell className='text-secondary bg-pay'>Description</Table.HeadCell>
      <Table.HeadCell className='text-secondary bg-pay'>Amount (₦)</Table.HeadCell>
      <Table.HeadCell className='text-secondary bg-pay'>Type</Table.HeadCell>
      <Table.HeadCell className='text-secondary bg-pay'>Status</Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y">
      <Table.Row className='text-secondary bg-pay'>
        <Table.Cell className="whitespace-nowrap font-medium">
          TXN001
        </Table.Cell>
        <Table.Cell>2025-01-23</Table.Cell>
        <Table.Cell>Purchase of Materials</Table.Cell>
        <Table.Cell>₦15,000</Table.Cell>
        <Table.Cell>Debit</Table.Cell>
        <Table.Cell>Completed</Table.Cell>
      
      </Table.Row>
      <Table.Row className='text-secondary bg-pay'>
        <Table.Cell className="whitespace-nowrap font-medium ">
          TXN002
        </Table.Cell>
        <Table.Cell>2025-01-22</Table.Cell>
        <Table.Cell>Payment Received</Table.Cell>
        <Table.Cell>₦25,000</Table.Cell>
        <Table.Cell>Credit</Table.Cell>
        <Table.Cell>Pending</Table.Cell>
       
      </Table.Row>
      <Table.Row className='text-secondary bg-pay'>
        <Table.Cell className="whitespace-nowrap font-medium ">
          TXN003
        </Table.Cell>
        <Table.Cell>2025-01-21</Table.Cell>
        <Table.Cell>Subscription Payment</Table.Cell>
        <Table.Cell>₦5,000</Table.Cell>
        <Table.Cell>Debit</Table.Cell>
        <Table.Cell>Completed</Table.Cell>
      
      </Table.Row>
      <Table.Row className='text-secondary bg-pay'>
        <Table.Cell className="whitespace-nowrap font-medium">
          TXN004
        </Table.Cell>
        <Table.Cell>2025-01-20</Table.Cell>
        <Table.Cell>Refund Issued</Table.Cell>
        <Table.Cell>₦10,000</Table.Cell>
        <Table.Cell>Debit</Table.Cell>
        <Table.Cell>Failed</Table.Cell>
    
      </Table.Row>
      <Table.Row className='text-secondary bg-pay'>
        <Table.Cell className="whitespace-nowrap font-medium ">
          TXN005
        </Table.Cell>
        <Table.Cell>2025-01-19</Table.Cell>
        <Table.Cell>Salary Payment</Table.Cell>
        <Table.Cell>₦50,000</Table.Cell>
        <Table.Cell>Credit</Table.Cell>
        <Table.Cell>Completed</Table.Cell>
     
      </Table.Row>
    </Table.Body>
  </Table>
</div>

    </div>
  );
};

export default Dashboard;
