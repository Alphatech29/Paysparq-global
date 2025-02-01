import React, { useEffect, useState } from 'react';
import { Tabs, TextInput } from "flowbite-react";
import Swal from 'sweetalert2';
import DashboardLogic from '../../../../components/dashboard/dashboard';
import axios from 'axios';
import LoadingSpinner from '../../../../components/preload/ApiLoading';

const AddFund = () => {
  const { userData } = DashboardLogic();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (userData && userData.accountNumber && userData.fullname) {
      setLoading(false);
    }
  }, [userData]);

  useEffect(() => {
    // Remove focus styles from Tabs
    const tabs = document.querySelectorAll('.tabs [role="tab"]');
    tabs.forEach(tab => {
      tab.style.outline = "none";
      tab.style.border = "none";
      tab.style.boxShadow = "none";
    });
  }, []);

  const copyAccountDetails = () => {
    if (!userData || !userData.accountNumber || !userData.fullname) {
      Swal.fire({
        icon: 'error',
        title: 'Incomplete Data',
        text: 'User data is incomplete.',
      });
      return;
    }

    const accountDetails = `Account Number: ${userData.accountNumber}
      Account Name: ${userData.fullname || 'N/A'}
      Bank Name: Paysparq`;

    navigator.clipboard.writeText(accountDetails)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Copied to Clipboard',
          text: 'Account details copied to clipboard!',
          customClass: {
            confirmButton: 'bg-primary-600 text-pay px-6 py-2 rounded-lg hover:bg-primary-600 transition duration-300',
          },
        });
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Copy Failed',
          text: 'Failed to copy account details. Please try again.',
          customClass: {
            confirmButton: 'bg-primary-600 text-pay px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300',
          },
        });
      });
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFundDeposit = async () => {
    const payload = {
      userID: userData?.uid,
      depositAmount: parseFloat(amount),
      transactionDescription: "Wallet funding",
    };
  
    if (!amount || isNaN(amount) || amount <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Amount',
        text: 'Please enter a valid amount.',
      });
      return;
    }
  
    if (!userData || !userData.accountNumber) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Data',
        text: 'User data is missing.',
      });
      return;
    }
  
    try {
      const response = await axios.post("/api/deposit", payload);
      console.log(response.data);
  
      if (response.data && response.data.message) {
        Swal.fire({
          icon: 'success',
          title: 'Deposit Successful',
          text: 'Your wallet has been funded!',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'bg-primary-600 text-pay px-6 py-2 rounded-lg hover:bg-primary-600 transition duration-300',
          },
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Deposit Failed',
          text: response.data.message || "Deposit failed. Please try again.",
          customClass: {
            confirmButton: 'bg-primary-600 text-pay px-6 py-2 rounded-lg hover:bg-primary-600 transition duration-300',
          },
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Deposit failed. Please try again.";
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        customClass: {
          confirmButton: 'bg-primary-600 text-pay px-6 py-2 rounded-lg hover:bg-primary-600 transition duration-300',
        },
      });
    }
  };
  

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='flex gap-4'>
      <div className='w-full shadow-md shadow-primary-600/50 rounded-lg bg-pay p-4 h-dvh'>
        <Tabs aria-label="Tabs with underline" variant="underline" className="gap-5 tabs">
          <Tabs.Item active title="Bank Transfer">
            <div className="w-[50%]">
              <h4 className="text-sm pb-3">
                Fund your NGN balance by making a transfer to the account numbers below via your preferred bank app, or via NIBSS Instant Payment (NIP) on your internet banking platforms.
              </h4>
              <div className="flex flex-col space-y-2 divide-y text-base">
                <div className="flex justify-between">
                  <span>Account Number:</span>
                  <span>{userData?.accountNumber || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Account Name:</span>
                  <span>{userData?.fullname || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bank Name:</span>
                  <span>Paysparq</span>
                </div>
              </div>
              <button 
                className="bg-primary-600 rounded-md mt-5 px-4 w-full text-base h-10 text-pay font-semibold" 
                onClick={copyAccountDetails}
              >
                Copy Details
              </button>
            </div>
          </Tabs.Item>

          <Tabs.Item active title="Fund with card">
            <div className="w-[50%]">
              <h4 className="text-sm pb-3">
                Fund your wallet now and spend effortlessly later! No need to enter card details for every payment. Enjoy faster, smoother transactions with just a tap—secure, convenient, and hassle-free every time you pay.
              </h4>
              <div className="flex flex-col space-y-2 divide-y text-base">
                <TextInput 
                  placeholder="$1000" 
                  value={amount} 
                  onChange={handleAmountChange} 
                />
              </div>
              <button
                className="bg-primary-600 rounded-md mt-5 px-4 w-full text-base h-10 text-pay font-semibold"
                onClick={handleFundDeposit}
              >
                Proceed
              </button>
            </div>
          </Tabs.Item>
        </Tabs>
      </div>
    </div>
  );
};

export default AddFund;
