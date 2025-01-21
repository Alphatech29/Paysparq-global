import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Dynamically set from environment
  timeout: 10000, // Optional timeout
});

export default api;
