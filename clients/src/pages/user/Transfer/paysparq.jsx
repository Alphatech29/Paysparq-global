import { useState, useEffect } from "react";
import { TextInput, Alert, Label, Spinner } from "flowbite-react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import DashboardLogic from "../../../../components/dashboard/dashboard";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Paysparq() {
  const { userData } = DashboardLogic();
  const [recipientAccountNumber, setRecipientAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNameFetched, setIsNameFetched] = useState(false);
  
  const [balanceError, setBalanceError] = useState("");
  const [accountError, setAccountError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [networkError, setNetworkError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (recipientAccountNumber.trim().length >= 10) {
        fetchRecipientName();
      } else {
        setRecipientName("");
        setIsNameFetched(false);
        //setAccountError("Account number must be at least 10 digits.");
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

  const sanitizeAmount = (value) => parseFloat(value.replace(/[^0-9.]/g, "")) || 0;

  const checkBalance = () => {
    const sanitizedAmount = sanitizeAmount(amount);
    const sanitizedBalance = sanitizeAmount(userData?.balance);

    if (sanitizedAmount > sanitizedBalance) {
      setBalanceError("Insufficient balance.");
    } else {
      setBalanceError("");
    }
  };

  const fetchRecipientName = async () => {
    setLoading(true);
    setAccountError("");
    setNetworkError("");

    if (recipientAccountNumber.trim().length < 10) {
      setAccountError("Account number must be at least 10 digits.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/transfer?accountNumber=${recipientAccountNumber}`);
      const data = await response.json();
      if (response.ok && data.full_name) {
        setRecipientName(data.full_name);
        setIsNameFetched(true);
      } else {
        setRecipientName("");
        setAccountError("Account number not valid.");
        setIsNameFetched(false);
      }
    } catch (error) {
      setRecipientName("");
      setNetworkError("Invalid account number or network error.");
      setIsNameFetched(false);
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async () => {
    setLoading(true);
    setBalanceError("");
    setAmountError("");
    setNetworkError("");

    if (!userData?.accountNumber) {
      setAccountError("Sender account number is missing.");
      setLoading(false);
      return;
    }

    const sanitizedAmount = sanitizeAmount(amount);
    if (!sanitizedAmount || sanitizedAmount <= 0) {
      setAmountError("Please enter a valid amount.");
      setLoading(false);
      return;
    }

    if (sanitizedAmount > sanitizeAmount(userData?.balance)) {
      setBalanceError("Insufficient balance.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderAccountNumber: userData?.accountNumber?.trim() || "",
          recipientAccountNumber: recipientAccountNumber.trim(),
          amount: sanitizedAmount,
          remarks: remarks.trim(),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "Transfer Successful!",
          text: "Your transfer was successful.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "bg-green-500",
          },
        }).then(() => navigate("/user/dashboard"));
        
      } else {
        setNetworkError(data.message || "Transfer failed");
      }
    } catch (error) {
      setNetworkError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-pay shadow-md shadow-primary-600/50 px-3 py-3 min-h-dvh mb-4 rounded-md">
      <div>
        <h1 className="text-lg font-semibold">Transfer to Paysparq</h1>
      </div>
      <div className="w-[40%] border border-primary-600/50 px-3 py-3 rounded-md mt-4 ">
        <Label htmlFor="recipientAccountNumber" value="Recipient Account Number" />
        <TextInput
          id="recipientAccountNumber"
          type="text"
          placeholder="Recipient account number"
          value={recipientAccountNumber}
          onChange={(e) => setRecipientAccountNumber(e.target.value)}
          disabled={loading}
        />
        {accountError && <Alert color="failure" className="mt-2 p-2" icon={HiXCircle}><span className=" text-sm">{accountError}</span></Alert>}
        {isNameFetched && recipientName && (
          <Alert color="success" icon={HiCheckCircle} className="mt-2 p-2">
            <span className="font-medium">{recipientName}</span>
          </Alert>
        )}

        <Label htmlFor="amount" value="Amount" />
        <TextInput
          id="amount"
          type="text"
          placeholder="1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={!isNameFetched || loading}
        />
        {balanceError && <Alert color="failure" icon={HiXCircle}>{balanceError}</Alert>}
        {amountError && <Alert color="failure" icon={HiXCircle}>{amountError}</Alert>}

        <div className="flex gap-3 mt-4 items-center justify-center">
          {[1000, 2000, 3000, 5000, 10000].map((amt) => (
            <button
              key={amt}
              className="rounded-md shadow-md shadow-primary-600/50 text-base items-center px-3 py-2 flex cursor-pointer"
              onClick={() => setAmount(String(amt))}
            >
              {amt}
            </button>
          ))}
        </div>

        <Label htmlFor="remarks" value="Remarks" />
        <TextInput
          id="remarks"
          type="text"
          placeholder="Optional"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          disabled={!isNameFetched || loading}
        />

        {networkError && <Alert color="failure" icon={HiXCircle}>{networkError}</Alert>}

        <div className="flex justify-end">
          <button
            className="bg-primary-600 text-sm px-4 py-2 text-paysparq rounded-md disabled:opacity-50 flex items-center mt-4"
            onClick={handleTransfer}
            disabled={!isNameFetched || !recipientAccountNumber || !amount || loading || balanceError}
          >
            {loading ? <Spinner size="sm" className="mr-2" /> : "Transfer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Paysparq;
