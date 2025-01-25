// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: null,  // The default is null while checking authentication status
  loading: true,        // Start with loading as true until we determine the auth status
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAuth(state) {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
          const now = Math.floor(Date.now() / 1000); // Get current time
          state.authenticated = payload.exp > now; // Check if token is expired
        } catch (error) {
          state.authenticated = false; // If token is invalid, set authenticated to false
        }
      } else {
        state.authenticated = false; // If no token, set authenticated to false
      }
      state.loading = false; // Set loading to false once the check is complete
    },
    logout(state) {
      localStorage.removeItem("authToken"); // Remove token from localStorage on logout
      state.authenticated = false; // Set authenticated to false
    },
    setAuthenticated(state, action) {
      state.authenticated = action.payload; // Set authentication status manually (e.g., after login)
      state.loading = false; // Set loading to false after login
    },
  },
});

// Selectors to access state
export const selectAuth = (state) => state.auth.authenticated;
export const selectLoading = (state) => state.auth.loading;

export const { checkAuth, logout, setAuthenticated } = authSlice.actions;

export default authSlice.reducer;
