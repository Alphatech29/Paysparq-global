import React from 'react';
import { FaDollarSign, FaExchangeAlt } from "react-icons/fa";
import { IoPhonePortrait } from "react-icons/io5";
import { MdCurrencyExchange } from "react-icons/md";
import { FaBitcoin } from "react-icons/fa6";
import { Table } from "flowbite-react";
import ExchangeRate from "../../../../components/dashboard/ExchageRate";
import DashboardLogic from '../../../../components/dashboard/dashboard'; 

const DefaultDashboard = () => {
  const { userData } = DashboardLogic(); 

  return (
    <div>
      <div>
        <span className="text-xl">Welcome Back!</span>
        <h2 className="text-base">{userData?.fullname || 'N/A'}</h2>
      </div>
      <div className="flex w-full gap-4">
        <div className="bg-primary-600 w-[40%] px-4 py-3 rounded-lg mt-3 text-paysparq justify-center items-start flex flex-col shadow-md shadow-primary-600 relative">
          <FaDollarSign className="absolute left-[70%] top-0 inset-0 text-[150px] blur-lg text-paysparq" />
          <div>
            <span className="text-base">Balance</span>
            <h2 className="text-3xl">
              <strong>${userData?.balance || '0.00'}</strong>
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
      <ExchangeRate />
      <div className="overflow-x-auto mt-6 shadow-md shadow-primary-600/50 rounded-lg bg-pay">
        <h1 className="py-2 text-lg pl-2 text-secondary">Transaction</h1>
        <Table hoverable className="bg-pay">
          <Table.Head className="text-secondary bg-pay">
            <Table.HeadCell className="bg-pay">Transaction ID</Table.HeadCell>
            <Table.HeadCell className="text-secondary bg-pay">Date</Table.HeadCell>
            <Table.HeadCell className="text-secondary bg-pay">Description</Table.HeadCell>
            <Table.HeadCell className="text-secondary bg-pay">Amount (₦)</Table.HeadCell>
            <Table.HeadCell className="text-secondary bg-pay">Type</Table.HeadCell>
            <Table.HeadCell className="text-secondary bg-pay">Status</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="text-secondary">
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

export default DefaultDashboard;
