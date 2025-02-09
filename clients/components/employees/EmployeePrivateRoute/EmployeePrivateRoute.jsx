import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { EmployeeAuthContext } from "../../control/EmployeeAuthContext"; 
import LoadingSpinner from "../../preload/ApiLoading";

const EmployeePrivateRoute = ({ children }) => {
  const { employeeToken, employeeDetails, signInEmployee } = useContext(EmployeeAuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = Cookies.get("employeeAuthToken");
    const storedDetails = localStorage.getItem("employeeDetails");

    if (!employeeToken && storedToken) {
      try {
        signInEmployee(storedToken, storedDetails ? JSON.parse(storedDetails) : null);
      } catch (error) {
        console.error("Error restoring authentication:", error);
      }
    }

    setLoading(false);
  }, [employeeToken]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return employeeToken && employeeDetails ? children : <Navigate to="/workforce/login" replace />;
};

export default EmployeePrivateRoute;
