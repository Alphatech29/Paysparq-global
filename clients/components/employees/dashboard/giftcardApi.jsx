import axios from "axios";

// Fetch all gift card transactions
export const getAllGiftCardHistory = async () => {
  try {
    console.log("Fetching all gift card history...");
    const response = await axios.get(`/api/gift-card-history`);
    console.log("Gift card history fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching gift card history:", error);
    throw error?.response?.data || "An error occurred while fetching data.";
  }
};

// Approve or reject a trade
export const updateTradeStatus = async (transactionNo, action, comment = '') => {
  try {
    if (!transactionNo) {
      throw new Error('Missing required field: transactionNo');
    }

    const requestPayload = {
      transactionNo,
      action,
    };

    console.log("Preparing request payload:", requestPayload);

    // If action is 'rejected', include the comment in the payload
    if (action === 'rejected' && comment.trim()) {
      requestPayload.comment = comment.trim();
      console.log("Comment added to rejection:", requestPayload.comment);
    }

    // Send the request to the backend
    console.log("Sending request to update trade status...");
    const response = await axios.put('/api/approve-trade', requestPayload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log("Trade status updated successfully:", response.data);
    return response.data; // Successful response

  } catch (error) {
    console.error('Error updating trade status:', error.response?.status, error.message);
    throw new Error(error.response?.data?.message || error.message || 'An error occurred while updating the trade status.');
  }
};
