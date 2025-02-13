import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Table } from "flowbite-react";
import { AuthContext } from "../../control/AuthContext";
import LoadingSpinner from "../../preload/ApiLoading";
import GiftcardHistoryModal from "./giftCardHistoryModal";

const GiftcardHistory = () => {
  const { userUid } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchGiftcardHistory = async () => {
      if (!userUid) {
        setError("User ID is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/giftcard-history/${userUid}`);
        console.log("API Response:", response.data);

        if (response?.data?.data) {
          const sortedTransactions = response.data.data.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setTransactions(sortedTransactions);
          setError(null);
        } else {
          setError("No giftcard history found.");
        }
      } catch (err) {
        console.error("Error fetching transaction history:", err);
        setError("Failed to load transaction history.");
      } finally {
        setLoading(false);
      }
    };

    fetchGiftcardHistory();
  }, [userUid]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="overflow-x-auto shadow-md w-full shadow-primary-600/50 mb-6 rounded-lg bg-pay">
      <h1 className="py-2 text-lg pl-2 text-secondary">Transaction History</h1>
      <Table hoverable className="bg-pay">
        <Table.Head className="text-secondary bg-pay">
          <Table.HeadCell>Giftcard Name/Sub category</Table.HeadCell>
          <Table.HeadCell>Quantity (Rate)</Table.HeadCell>
          <Table.HeadCell>Amount (₦)</Table.HeadCell>
          <Table.HeadCell>Card Type</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {transactions.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan="6" className="text-center h-[400px]">
                No transaction history available.
              </Table.Cell>
            </Table.Row>
          ) : (
            transactions.map((transaction) => (
              <Table.Row
                key={transaction.transaction_no}
                className="text-secondary cursor-pointer"
                onClick={() => {
                  setSelectedTransaction(transaction);
                  setIsModalOpen(true);
                }}
              >
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <img src={transaction.avatar_url} alt="Avatar" className="w-9 h-9 rounded-full" />
                    <div>
                      <span className="text-base">{transaction.card_name}</span>
                      <span className="text-sm text-secondary/50 block">{transaction.card_country}</span>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>${transaction.card_value} (₦{transaction.exchange_rate})</Table.Cell>
                <Table.Cell>₦{Number(transaction.trade_amount).toLocaleString("en-US")}</Table.Cell>
                <Table.Cell>{transaction.card_type}</Table.Cell>
                <Table.Cell>{transaction.trade_status}</Table.Cell>
                <Table.Cell>
                  {new Date(transaction.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })} {" "}
                  {new Date(transaction.created_at).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>

      {/* Giftcard History Modal */}
      {selectedTransaction && (
        <GiftcardHistoryModal
          transaction={selectedTransaction}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default GiftcardHistory;