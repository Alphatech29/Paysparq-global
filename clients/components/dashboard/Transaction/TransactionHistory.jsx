import {useState, useEffect, useContext } from 'react';
import { Table } from 'flowbite-react';
import { AuthContext } from '../../control/AuthContext';
import TransactionModal from '../Transaction/TransactionModel'; 

const TransactionHistory = () => {
  const { userUid } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!userUid) {
      return;
    }

    const fetchTransactions = async () => {
      try {
        const response = await fetch(`/api/transactions/${userUid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchTransactions();
  }, [userUid]);

  const formatAmount = (amount) => {
    if (amount) {
      return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
    }
    return '₦0.00';
  };

  const handleRowClick = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
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
            <Table.Row >
              <Table.Cell colSpan={6} className="text-center text-secondary h-[400px]">No transaction history available.</Table.Cell>
            </Table.Row>
          ) : (
            transactions.slice(0, 10).map((transaction) => (
              <Table.Row
                key={transaction.transaction_id}
                className="text-secondary cursor-pointer"
                onClick={() => handleRowClick(transaction)}
              >
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

      {/* Transaction Modal */}
      {isModalOpen && selectedTransaction && (
        <TransactionModal
          isOpen={isModalOpen}
          transaction={selectedTransaction}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default TransactionHistory;