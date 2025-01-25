import React from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddFund = () => {
  const copyAccountDetails = () => {
    const accountDetails = `
      Account Number: 7812448972
      Account Name: Paysparq Limited
      Bank Name: Wema Bank PLC
    `;
    navigator.clipboard.writeText(accountDetails)
      .then(() => {
        toast.success('Account details copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy account details. Please try again.');
      });
  };

  return (
    <div>
      <div className='w-[40%] shadow-md shadow-primary-600/50 rounded-lg bg-pay p-4'>
        <h1 className='text-lg font-semibold pb-2'>Fund Your NGN Account</h1>
        <h4 className='text-sm pb-3'>
          Fund your NGN balance by making a transfer to the account numbers below via your preferred bank app, or via NIBSS Instant Payment (NIP) on your internet banking platforms.
        </h4>
        <div className='flex flex-col space-y-2 divide-y text-base'>
          <div className='flex justify-between'>
            <span>Account Number:</span>
            <span>7812448972</span>
          </div>
          <div className='flex justify-between'>
            <span>Account Name:</span>
            <span>Paysparq Limited</span>
          </div>
          <div className='flex justify-between'>
            <span>Bank Name:</span>
            <span>Wema Bank PLC</span>
          </div>
          <button
            className='bg-primary-600 rounded-md px-4 py-3 text-pay font-semibold'
            onClick={copyAccountDetails}
          >
            Copy Details
          </button>
        </div>
      </div>
      <ToastContainer  className="text-[16px]" />
    </div>
  );
};

export default AddFund;
