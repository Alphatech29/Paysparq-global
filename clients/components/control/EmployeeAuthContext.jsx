import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

// Create a context for employee authentication
export const EmployeeAuthContext = createContext();

export const EmployeeAuthProvider = ({ children }) => {
  const [employeeToken, setEmployeeToken] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState(null);


  // Restore authentication state on load
  useEffect(() => {
    const token = Cookies.get("employeeAuthToken");
    const storedDetails = localStorage.getItem("employeeDetails");

    if (token) {
      setEmployeeToken(token);
      try {
        const decoded = jwtDecode(token);
        setEmployeeDetails(storedDetails ? JSON.parse(storedDetails) : decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        signOutEmployee();
      }
    }
  }, []);

  // Sign in function for employee
  const signInEmployee = (token, details) => {
    setEmployeeToken(token);
    setEmployeeDetails(details);
    Cookies.set("employeeAuthToken", token, {
      expires: 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    localStorage.setItem("employeeDetails", JSON.stringify(details));
  };

  // Sign out function for employee
  const signOutEmployee = () => {
    setEmployeeToken(null);
    setEmployeeDetails(null);
    Cookies.remove("employeeAuthToken");
    localStorage.removeItem("employeeDetails");
  };

  return (
    <EmployeeAuthContext.Provider value={{ employeeToken, employeeDetails, signInEmployee, signOutEmployee }}>
      {children}
    </EmployeeAuthContext.Provider>
  );
};

// Custom hook to use employee authentication context
export const useEmployeeAuth = () => useContext(EmployeeAuthContext);
