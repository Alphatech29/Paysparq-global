import axios from "axios";

export const purchaseAirtime = async (amount, type, phone, uid) => {
  const requestData = { amount, type, phone, uid };

  try {
    const response = await axios.post("/api/vtu/airtime", requestData);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message); 
    throw error.response?.data || error.message;
  }
};
