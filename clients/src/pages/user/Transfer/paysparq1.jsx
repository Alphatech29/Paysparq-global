import { useState, useEffect } from "react";
import { Modal, TextInput, Alert, Label, Spinner } from "flowbite-react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import DashboardLogic from "../../../../components/dashboard/dashboard";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Paysparq({ openModal, setOpenModal }) {
  const { userData, error } = DashboardLogic();
  const [recipientAccountNumber, setRecipientAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [isNameFetched, setIsNameFetched] = useState(false);
  const [balanceError, setBalanceError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Sender Account Number:", userData?.accountNumber);

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
    if (amount.trim() !== "" && userData?.balance) {
      checkBalance();
    } else {
      setBalanceError(""); 
    }
  }, [amount, userData]); 

  const sanitizeAmount = (value) => {
    return parseFloat(value.replace(/[^0-9.]/g, "")).toFixed(2); 
  };

  const checkBalance = () => {
    const sanitizedAmount = sanitizeAmount(amount); 
    const sanitizedBalance = sanitizeAmount(userData?.balance); 

    console.log("Sanitized Amount: ", sanitizedAmount); 
    console.log("Sanitized Balance: ", sanitizedBalance);  
    
    if (isNaN(sanitizedAmount) || isNaN(sanitizedBalance)) {
      setBalanceError("Invalid balance or amount.");
      console.log("Invalid values detected");  
      return;
    }

    if (parseFloat(sanitizedAmount) > parseFloat(sanitizedBalance)) {
      setBalanceError("Insufficient balance.");
      console.log("Insufficient balance detected");  
    } else {
      setBalanceError("");
    }
  };

  const fetchRecipientName = async () => {
    setLoading(true);
    setMessage(null);
    setIsNameFetched(false);

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
  
    if (!userData?.accountNumber) {
      setMessage("Sender account number is missing.");
      setMessageType("error");
      setLoading(false);
      return;
    }
  
    const sanitizedAmount = sanitizeAmount(amount);
    const sanitizedAmountNumber = parseFloat(sanitizedAmount); 
  
    if (!sanitizedAmount || isNaN(sanitizedAmountNumber) || sanitizedAmountNumber <= 0) {
      setMessage("Please enter a valid amount.");
      setMessageType("error");
      setLoading(false);
      return;
    }
  
    const sanitizedBalance = sanitizeAmount(userData?.balance);
    if (parseFloat(sanitizedAmount) > parseFloat(sanitizedBalance)) {
      setBalanceError("Insufficient balance.");
      setMessageType("error");
      setLoading(false);
      return;
    }
  
    const requestData = {
      senderAccountNumber: userData?.accountNumber?.trim() || "",
      recipientAccountNumber: recipientAccountNumber.trim(),
      amount: sanitizedAmountNumber,
      remarks: remarks.trim(),
    };
  
    try {
      const response = await fetch("/api/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage("Transfer successful!");
        setMessageType("success");

        Swal.fire({
          title: 'Transfer Successful!',
          text: 'Your transfer was successful.',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'bg-primary-600 text-pay px-6 py-2 rounded-lg hover:bg-primary-600 transition duration-300',
          },
        }).then(() => {
          navigate('/user/dashboard'); 
        });
      } else {
        console.error("Transfer Error:", data);
        setMessage(data.message || "Transfer failed");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Network Error:", error);
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
              placeholder="1000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={loading}
            />
            {balanceError && (
              <Alert color="failure" icon={HiXCircle} className="mt-2 p-2">
                {balanceError}
              </Alert>
            )}
            {message && (
              <Alert color={messageType === "error" ? "failure" : "success"} icon={messageType === "error" ? HiXCircle : HiCheckCircle} className="mt-2 p-2">
                {message}
              </Alert>
            )}
            <Label htmlFor="remarks" value="Remarks" />
            <TextInput
              id="remarks"
              type="text"
              placeholder="Optional"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
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
