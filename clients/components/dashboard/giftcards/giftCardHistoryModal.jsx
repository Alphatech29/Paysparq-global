import { Button, Modal } from "flowbite-react";

const GiftcardHistoryModal = ({ transaction, isOpen, onClose }) => {
  if (!transaction) return null;

  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      size="md"
      className="flex justify-end items-en"
    >
      <Modal.Header className="bg-pay text-base">Transaction Details</Modal.Header>
      <Modal.Body className="shadow-md w-full shadow-primary-600/50 rounded-lg bg-pay text-secondary">
        <div>
          <div className="flex gap-5">
            <div>
              <img
                src={transaction.avatar_url}
                alt=""
                className="w-16 h-14 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-base font-semibold">{transaction.card_name}</h1>
              <span className="text-gray-500">{transaction.card_country}</span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="text-gray-500 text-sm">Transaction NO</span>
              <h1 className="font-semibold text-sm">{transaction.transaction_no}</h1>
            </div>
            <Button
              size="xs"
              onClick={() =>
                navigator.clipboard.writeText(transaction.transaction_no)
              }
            >
              Copy
            </Button>
          </div>

          <div className="flex justify-between mt-4">
            <div>
              <span className="text-gray-500 text-sm">Card Type</span>
              <h1 className="text-sm">{transaction.card_type}</h1>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Date and Time</span>
              <h1 className="text-sm">
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
              </h1>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <div>
              <span className="text-gray-500 text-sm">Quantity</span>
              <h1 className="text-sm">${transaction.card_value}</h1>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Trade Rate</span>
              <h1 className="text-sm">₦{transaction.exchange_rate}</h1>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <div>
              <span className="text-gray-500 text-sm">Transaction Status</span>
              <h1 className="font-semibold text-sm">{transaction.trade_status}</h1>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Total Amount</span>
              <h1 className="text-sm">
                ₦{Number(transaction.trade_amount).toLocaleString("en-US")}
              </h1>
            </div>
          </div>

          {/* Display Multiple Images */}
          <div>
            <span className="text-gray-500 text-sm">Card Images</span>
            <div className="flex gap-2 flex-wrap mt-2">
              {transaction.image_url.split(",").map((url, index) => (
                <img key={index} src={url.trim()} alt={`Card ${index + 1}`} className="w-10 h-10 rounded-md" />
              ))}
            </div>
          </div>


          <div className="flex flex-col mt-4">
            <span className="text-gray-500 text-sm">Admin Comment</span>
            <p
              className={`text-sm ${transaction.comment ? "text-gray-700" : "text-gray-400 italic"
                }`}
            >
              {transaction.comment || "No comments available"}
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default GiftcardHistoryModal;
