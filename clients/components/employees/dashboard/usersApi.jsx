import axios from "axios";

// Fetch all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get("/api/users");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateUser = async (uid, userData) => {
  try {
    const response = await axios.put(`/api/users/${uid}`, userData);
    console.log('User updated successfully:', response.data);
    return response.data;
  } catch (error) {
    // Check if error.response is available and log it properly
    if (error.response) {
      console.error('API Error:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // In case there's no response but the request was made
      console.error('No response received:', error.request);
    } else {
      console.error('Error during the request setup:', error.message);
    }
    throw error.response?.data || error.message;
  }
};

