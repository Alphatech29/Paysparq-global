import axios from "axios";

export const getGiftcardRate = async () => {
  try {
    const response = await axios.get("/api/giftcard-rate");

    if (response.data.message) {
      throw new Error(response.data.message);
    }

    return response.data;

  } catch (error) {
    console.error("Error fetching gift card rate:", error.message);
    throw error.response?.data || error.message;
  }
};


export const deleteGiftcardRate = async (id) => {
  try {
    const response = await fetch(`/api/giftcard-rate/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete giftcard rate');
    }

    return response.json();
  } catch (error) {

    console.error('Error during deletion:', error);
    throw new Error(error.message || 'An unexpected error occurred');
  }
};

export const createGiftcard = async (formData) => {
  try {
    const response = await fetch('/api/createCard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error from server:', errorData);
      throw new Error(errorData.message || 'Failed to create card');
    }

    const data = await response.json();

    if (data.status === 'success') {
      return data;
    } else {
      throw new Error(data.message || 'Unexpected response from server');
    }
  } catch (error) {
    console.error('Error creating giftcard:', error);
    throw error; 
  }
};


export const createExchangeRate = async (formData) => {
  try {

    const response = await fetch("/api/new-rate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from server:", errorData);
      throw new Error(errorData.message || "Failed to create exchange rate");
    }

    const data = await response.json();

    if (data.status === "success") {
      return data;
    } else {
      throw new Error(data.message || "Unexpected response from server");
    }
  } catch (error) {
    console.error("Error creating exchange rate:", error);
    throw error;
  }
};















