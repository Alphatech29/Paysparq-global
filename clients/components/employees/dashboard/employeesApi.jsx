import axios from "axios";


export const getAllEmployees = async () => {
  try {
    const response = await axios.get("/api/employees");
    return response.data; 
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const updateEmployee = async (id, payload) => {
  try {
    const response = await axios.put(`/api/employees/${id}`, payload);

    if (response.data?.message === 'Employee updated successfully') {
      return response.data;
    } else {
      throw new Error(response.data?.message || 'Failed to update employee');
    }
  } catch (error) {
    console.error('Error response:', error.response?.data || error.message);
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    throw new Error(errorMessage);
  }
};






