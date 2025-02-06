import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Table } from "flowbite-react";
import { AuthContext } from "../../control/AuthContext"; 
import LoadingSpinner from "./../../preload/ApiLoading";

const GiftcardHistory = () => {
  const { userUid } = useContext(AuthContext); 
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGiftcardHistory = async () => {
      if (!userUid) {
        setError("User ID is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/giftcard-history/${userUid}`);
        const sortedTransactions = response.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        setTransactions(sortedTransactions);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
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
        <LoadingSpinner/>
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
          <Table.HeadCell className="bg-pay">Giftcard Name/Sub category</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Quantity (Rate)</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Amount (₦)</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Card Type</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Status</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Date</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {transactions.map((transaction) => (
            <Table.Row key={transaction.transaction_no} className="text-secondary">
              <Table.Cell>
                <div className="flex items-center justify-start gap-3">
                  <span><img src={transaction.avatar_url} alt="" className="w-9 h-9 rounded-full" /></span>
                  <div className="flex flex-col">
                    <span className="text-base">{transaction.card_name}</span>
                    <span className="text-sm text-secondary/50">{transaction.card_country}</span>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>${transaction.card_value} (₦{transaction.exchange_rate})</Table.Cell>
              <Table.Cell>₦{Number(transaction.trade_amount).toLocaleString("en-US")}</Table.Cell>
              <Table.Cell>{transaction.card_type}</Table.Cell>
              <Table.Cell>{transaction.trade_status}</Table.Cell>
              <Table.Cell>{new Date(transaction.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}{" "}
                {new Date(transaction.created_at).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default GiftcardHistory;
