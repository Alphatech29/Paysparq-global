// TransactionModal.js
import React from 'react';
import { Modal } from 'flowbite-react';
import PropTypes from 'prop-types';

const TransactionModal = ({ isOpen, transaction, onClose }) => {
  return (
    <Modal show={isOpen} onClose={onClose} className='bg-primary-600/20 fixed inset-0 z-50 transition-all '>
      <Modal.Header>Transaction Details</Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <p><strong>Transaction ID:</strong> {transaction.transaction_id}</p>
          <p><strong>Description:</strong> {transaction.description || "N/A"}</p>
          <p><strong>Amount (₦):</strong> {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(transaction.amount)}</p>
          <p><strong>Type:</strong> {transaction.transaction_type}</p>
          <p><strong>Status:</strong> {transaction.status}</p>
          <p><strong>Date:</strong> {transaction.transaction_date}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

TransactionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  transaction: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default TransactionModal;
