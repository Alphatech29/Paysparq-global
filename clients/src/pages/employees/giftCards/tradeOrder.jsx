import React, { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import { MdOutlineEditNote } from "react-icons/md";
import { LuView } from "react-icons/lu";
import Swal from 'sweetalert2';
import { getAllGiftCardHistory, updateTradeStatus } from '../../../../components/employees/dashboard/giftcardApi';

const TradeOrder = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getAllGiftCardHistory();
        setTransactions(data);
      } catch (err) {
        setError('Error fetching transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleTradeAction = async (transactionNo, action) => {
    try {
      if (action === 'rejected') {
        // Prompt for rejection comment
        const { value: comment } = await Swal.fire({
          title: 'Provide a reason for rejection',
          input: 'textarea',
          inputLabel: 'Rejection Comment',
          inputPlaceholder: 'Enter your comment...',
          inputAttributes: { required: true },
          showCancelButton: true,
          confirmButtonText: 'Reject Trade',
          cancelButtonText: 'Cancel',
          customClass: {
            cancelButton: 'bg-red-500 text-pay px-6 py-2 rounded-lg hover:bg-red-500/50 transition duration-300',
            confirmButton: 'bg-primary-600 text-pay px-6 py-2 rounded-lg hover:bg-primary-600 transition duration-300',
          },
          reverseButtons: true,
        });
  
        if (comment && comment.trim()) {
          // Call API to update trade status as rejected
          const response = await updateTradeStatus(transactionNo, 'rejected', comment.trim());
          Swal.fire({
            icon: 'success',
            title: 'Rejected!',
            text: response.message,
            customClass: {
              confirmButton: 'bg-primary-600 text-pay px-6 py-2 rounded-lg hover:bg-primary-600 transition duration-300',
            },
          });
  
          // Update the trade status in the local state
          setTransactions(transactions.map(transaction =>
            transaction.transaction_no === transactionNo
              ? { ...transaction, trade_status: 'rejected' }
              : transaction
          ));
        } else {
          Swal.showValidationMessage('Comment is required.');
        }
      }
  
      // Handle trade completion
      else if (action === 'completed') {
        const result = await Swal.fire({
          title: `Are you sure you want to approve this trade?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, approve it',
          cancelButtonText: 'Cancel',
          customClass: {
            cancelButton: 'bg-red-500 text-pay px-6 py-2 rounded-lg hover:bg-red-500/50 transition duration-300',
            confirmButton: 'bg-primary-600 text-pay px-6 py-2 rounded-lg hover:bg-primary-600 transition duration-300',
          },
          reverseButtons: true,
        });
  
        if (result.isConfirmed) {
          // Call API to update trade status as completed
          const response = await updateTradeStatus(transactionNo, 'completed');
          Swal.fire({
            icon: 'success',
            title: 'Approved!',
            text: response.message,
            customClass: {
              confirmButton: 'bg-primary-600 text-pay px-6 py-2 rounded-lg hover:bg-primary-600 transition duration-300',
            },
          });
  
          // Update the trade status in the local state
          setTransactions(transactions.map(transaction =>
            transaction.transaction_no === transactionNo
              ? { ...transaction, trade_status: 'completed' }
              : transaction
          ));
        }
      }
    } catch (error) {
      console.error("Error handling trade:", error);
      const errorMessage = error.response?.data?.message || error.message || 'Something went wrong.';
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
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="overflow-x-auto shadow-md w-full mb-6 rounded-lg bg-pay">
      <h1 className="py-2 text-lg pl-2 text-secondary">Trade History</h1>
      <Table hoverable className="bg-pay">
        <Table.Head className="text-secondary bg-pay">
          <Table.HeadCell>S/N</Table.HeadCell>
          <Table.HeadCell>Giftcard Name/Sub category</Table.HeadCell>
          <Table.HeadCell>User Name</Table.HeadCell>
          <Table.HeadCell>Quantity (Rate)</Table.HeadCell>
          <Table.HeadCell>Amount (₦)</Table.HeadCell>
          <Table.HeadCell>Card Type</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <Table.Row key={transaction.transaction_no} className="text-secondary">
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center justify-start gap-3">
                    <img src={transaction.avatar_url} alt="" className="w-9 h-9 rounded-full" />
                    <div className="flex flex-col">
                      <span className="text-base">{transaction.card_name}</span>
                      <span className="text-sm text-secondary/50">{transaction.card_country}</span>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>{transaction.username || '--'}</Table.Cell>
                <Table.Cell>{transaction.card_value} (₦{transaction.exchange_rate})</Table.Cell>
                <Table.Cell>₦{Number(transaction.trade_amount).toLocaleString("en-US")}</Table.Cell>
                <Table.Cell>{transaction.card_type}</Table.Cell>
                <Table.Cell>{transaction.trade_status}</Table.Cell>
                <Table.Cell>
                  {new Date(transaction.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  {new Date(transaction.created_at).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleTradeAction(transaction.transaction_no, 'completed')}
                      className="bg-green-500/70 text-pay rounded-md px-3 py-1 text-lg"
                      disabled={transaction.trade_status !== 'pending'}
                    >
                      <MdOutlineEditNote />
                    </button>
                    <button
                      onClick={() => handleTradeAction(transaction.transaction_no, 'rejected')}
                      className="bg-red-500/70 text-pay rounded-md px-3 py-1"
                      disabled={transaction.trade_status !== 'pending'}
                    >
                      <LuView />
                    </button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan="9" className="text-center">
                No transactions available.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TradeOrder;
