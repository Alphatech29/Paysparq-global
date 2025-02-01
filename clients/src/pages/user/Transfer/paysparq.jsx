import { useState, useEffect } from "react";
import { Modal, TextInput, Alert, Label, Spinner } from "flowbite-react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

function Paysparq({ openModal, setOpenModal, senderAccountNumber }) {
  const [recipientAccountNumber, setRecipientAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [isNameFetched, setIsNameFetched] = useState(false);
  const [senderBalance, setSenderBalance] = useState(null);
  const [balanceError, setBalanceError] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (recipientAccountNumber.trim().length >= 10) {
        fetchRecipientName();
      } else {
        setRecipientName("");
        setIsNameFetched(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [recipientAccountNumber]);

  useEffect(() => {
    if (amount.trim() !== "" && senderAccountNumber) {
      checkBalance();
    } else {
      setBalanceError("");
    }
  }, [amount]);

  const fetchSenderBalance = async () => {
    try {
      const response = await fetch(`/api/balance?accountNumber=${senderAccountNumber}`);
      const data = await response.json();
      if (response.ok) {
        setSenderBalance(data.balance);
      } else {
        setSenderBalance(null);
        setMessage("Error fetching sender balance.");
        setMessageType("error");
      }
    } catch (error) {
      setSenderBalance(null);
      setMessage("Network error. Please try again.");
      setMessageType("error");
    }
  };

  const checkBalance = () => {
    if (parseFloat(amount) > senderBalance) {
      setBalanceError("Insufficient balance.");
    } else {
      setBalanceError("");
    }
  };

  const fetchRecipientName = async () => {
    setLoading(true);
    setMessage(null);
    setIsNameFetched(false);

    // Early validation for recipient account number
    if (recipientAccountNumber.trim().length < 10) {
      setMessage("Account number must be at least 10 digits.");
      setMessageType("error");
      setIsNameFetched(true);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/transfer?accountNumber=${recipientAccountNumber}`);
      const data = await response.json();
      if (response.ok && data.full_name) {
        setRecipientName(data.full_name);
        fetchSenderBalance();
      } else {
        setRecipientName("");
        setMessage("Account number not valid.");
        setMessageType("error");
      }
    } catch (error) {
      setRecipientName("");
      setMessage("Invalid account number or network error.");
      setMessageType("error");
    } finally {
      setIsNameFetched(true);
      setLoading(false);
    }
  };

  const handleTransfer = async () => {
    setLoading(true);
    setMessage(null);
    setBalanceError("");
    try {
      const response = await fetch("/api/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderAccountNumber,
          recipientAccountNumber,
          amount: parseFloat(amount),
          narration,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Transfer successful!");
        setMessageType("success");
      } else {
        setMessage(data.message || "Transfer failed");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Transfer to Paysparq Account</Modal.Header>
      <Modal.Body>
        <div>
          <Label htmlFor="recipientAccountNumber" value="Recipient Account Number" />
          <TextInput
            id="recipientAccountNumber"
            type="text"
            placeholder="Recipient account number"
            value={recipientAccountNumber}
            onChange={(e) => setRecipientAccountNumber(e.target.value)}
            disabled={loading}
          />
          {isNameFetched && recipientName && (
            <Alert color="success" icon={HiCheckCircle} className="mt-2 p-2">
              <span className="font-medium">{recipientName}</span>
            </Alert>
          )}
        </div>

        {isNameFetched && recipientName && (
          <>
            <Label htmlFor="amount" value="Amount" />
            <TextInput
              id="amount"
              type="text"
              placeholder="$1000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={loading} 
            />
            {message && (
              <Alert color={messageType === "error" ? "failure" : "success"} icon={messageType === "error" ? HiXCircle : HiCheckCircle} className="mt-2 p-2">
                {message}
              </Alert>
            )}
            <Label htmlFor="narration" value="Narration" />
            <TextInput
              id="narration"
              type="text"
              placeholder="Optional"
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
              disabled={loading} 
            />
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <button
          className="bg-primary-600 px-4 py-2 text-paysparq rounded-md disabled:opacity-50 flex items-center"
          onClick={handleTransfer}
          disabled={!recipientAccountNumber || !amount || loading || balanceError}
        >
          {loading ? <Spinner size="sm" className="mr-2" /> : "Transfer"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default Paysparq;
