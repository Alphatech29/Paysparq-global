import React, { useState, useEffect, useContext } from 'react';
import { Table } from 'flowbite-react';
import { AuthContext } from '../control/AuthContext'; // Import AuthContext

const TransactionHistory = () => {
  const { userUid } = useContext(AuthContext);  // Access userUid from AuthContext
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);  // Declare loading state
  const [error, setError] = useState(null);  // Declare error state

  useEffect(() => {
    if (!userUid) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    const fetchTransactions = async () => {
      try {
        const response = await fetch(`/api/transactions/${userUid}`);  // Use userUid here
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userUid]);

  // Function to format the amount with commas and two decimal points
  const formatAmount = (amount) => {
    if (amount) {
      return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
    }
    return '₦0.00';
  };

  return (
    <div className="overflow-x-auto mt-6 shadow-md shadow-primary-600/50 mb-6 rounded-lg bg-pay">
      <h1 className="py-2 text-lg pl-2 text-secondary">Transaction History</h1>
      <Table hoverable className="bg-pay">
        <Table.Head className="text-secondary bg-pay">
          <Table.HeadCell className="bg-pay">Transaction ID</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Description</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Amount (₦)</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Type</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Status</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Date</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {transactions.length === 0 ? (
            <Table.Row className='h-[70px]'>
              <Table.Cell colSpan={6} className="text-center text-secondary">No transactions found</Table.Cell>
            </Table.Row>
          ) : (
            transactions.slice(0, 15).map((transaction) => (
              <Table.Row key={transaction.transaction_id} className="text-secondary">
                <Table.Cell>{transaction.transaction_no}</Table.Cell>
                <Table.Cell>{transaction.description || "N/A"}</Table.Cell>
                <Table.Cell>{formatAmount(transaction.amount)}</Table.Cell>
                <Table.Cell>{transaction.transaction_type}</Table.Cell>
                <Table.Cell>{transaction.status}</Table.Cell>
                <Table.Cell>{transaction.transaction_date}</Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TransactionHistory;
