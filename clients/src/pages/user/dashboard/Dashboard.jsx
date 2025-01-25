import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from '../../../../components/dashboard/Header';
import SideBar from '../../../../components/dashboard/SideBar';
import { HiInformationCircle } from "react-icons/hi";
import { Alert, Table } from "flowbite-react";
import { FaDollarSign, FaExchangeAlt } from "react-icons/fa";
import { IoPhonePortrait } from "react-icons/io5";
import { MdCurrencyExchange } from "react-icons/md";
import { FaBitcoin } from "react-icons/fa6";
import LoadingSpinner from "./../../../../components/preload/ApiLoading";

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
              <Route path="/" element={<DefaultDashboard />} />
            </Routes>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

const DefaultDashboard = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [date, setDate] = useState('');
  
  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/exchange-rates');
        const data = await response.json();

        if (data && Array.isArray(data.rates)) {
          const expectedCurrencies = ["USD", "EUR", "GBP"];
          const rates = expectedCurrencies.map((currency) => {
            const rate = data.rates.find((r) => r.currency_name === currency);
            return rate
              ? {
                  currency: rate.currency_name,
                  buying: rate.buying_rate,
                  selling: rate.selling_rate,
                  lastUpdated: rate.last_updated,
                }
              : { currency, rate: null, lastUpdated: data.date || "" };
          });

          setRates(rates);

          // Format last_updated date to Nigeria Time (WAT)
          const formattedDate = rates.length > 0 && rates[0].lastUpdated
            ? new Date(new Date(rates[0].lastUpdated).getTime() + (60 * 60 * 1000))
                .toLocaleString('en-US', {
                    timeZone: 'Africa/Lagos',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                })
            : "Invalid date"; 

          setDate(formattedDate); 
        } else {
          setErrorMessage("Failed to fetch exchange rates.");
        }
      } catch (error) {
        setErrorMessage("Error fetching exchange rates. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const formatCurrency = (currencyName, amount) => {
    if (typeof amount !== 'number') return amount; 
    return `₦${amount.toLocaleString('en-US')}`;
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

      {/* Show loading state inside the table */}
      <Table hoverable className="bg-pay">
        <Table.Head className="text-secondary bg-pay">
          <Table.HeadCell className="text-secondary bg-pay">Currency</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Buying</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Selling</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Last Update</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {loading ? (
            <Table.Row className='h-[200px]'>
              <Table.Cell colSpan="4" className="text-center text-secondary ">
                <LoadingSpinner/>
              </Table.Cell>
            </Table.Row>
          ) : errorMessage ? (
            <Table.Row>
              <Table.Cell colSpan="4" className="text-center text-secondary">
                {errorMessage}
              </Table.Cell>
            </Table.Row>
          ) : rates.length > 0 ? (
            rates.map((rate, index) => (
              <Table.Row key={index} className="text-secondary">
                <Table.Cell className="flex items-center">
                  <img
                    src={`/image/${rate.currency.toLowerCase()}.svg`}
                    alt={rate.currency}
                    className="w-6 h-6 mr-2 rounded-full"
                  />
                  {rate.currency}
                </Table.Cell>
                <Table.Cell>{formatCurrency(rate.currency, rate.buying)}</Table.Cell>
                <Table.Cell>{formatCurrency(rate.currency, rate.selling)}</Table.Cell>
                <Table.Cell>
                  {rate.lastUpdated
                    ? new Intl.DateTimeFormat('en-US', {
                        timeZone: 'Africa/Lagos',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      }).format(new Date(rate.lastUpdated))
                    : "N/A"}
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row >
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
            <Table.Row className='text-secondary'>
              <Table.Cell>TX12345</Table.Cell>
              <Table.Cell>2025-01-25 12:00 PM</Table.Cell>
              <Table.Cell>Payment to Vendor</Table.Cell>
              <Table.Cell>10,000</Table.Cell>
              <Table.Cell>Debit</Table.Cell>
              <Table.Cell>Completed</Table.Cell>
            </Table.Row>
            <Table.Row className='text-secondary'>
              <Table.Cell>TX12345</Table.Cell>
              <Table.Cell>2025-01-25 12:00 PM</Table.Cell>
              <Table.Cell>Payment to Vendor</Table.Cell>
              <Table.Cell>10,000</Table.Cell>
              <Table.Cell>Debit</Table.Cell>
              <Table.Cell>Completed</Table.Cell>
            </Table.Row>
            <Table.Row className='text-secondary'>
              <Table.Cell>TX12345</Table.Cell>
              <Table.Cell>2025-01-25 12:00 PM</Table.Cell>
              <Table.Cell>Payment to Vendor</Table.Cell>
              <Table.Cell>10,000</Table.Cell>
              <Table.Cell>Debit</Table.Cell>
              <Table.Cell>Completed</Table.Cell>
            </Table.Row>
            <Table.Row className='text-secondary'>
              <Table.Cell>TX12345</Table.Cell>
              <Table.Cell>2025-01-25 12:00 PM</Table.Cell>
              <Table.Cell>Payment to Vendor</Table.Cell>
              <Table.Cell>10,000</Table.Cell>
              <Table.Cell>Debit</Table.Cell>
              <Table.Cell>Completed</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
