import { useState, useContext } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { EmployeeAuthContext } from "../control/EmployeeAuthContext"; 

const EmployeeLoginLogic = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signInEmployee } = useContext(EmployeeAuthContext); 

  const storeAuthToken = (token, rememberMe) => {
    const expirationDays = rememberMe ? 7 : 1;

    if (!token || token.split('.').length !== 3) {
      toast.error("Invalid token format.");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const employeeUid = decodedToken?.uid; 

      Cookies.set("employeeAuthToken", token, {
        expires: expirationDays,
        secure: process.env.NODE_ENV === "production" || window.location.protocol === 'https:',
        sameSite: "strict",
      });

      if (employeeUid) {
        Cookies.set("employeeUid", employeeUid, {
          expires: expirationDays,
          secure: process.env.NODE_ENV === "production" || window.location.protocol === 'https:',
          sameSite: "strict",
        });
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      toast.error("Invalid token specified.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailOrUsername || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/office/login", {
        emailOrUsername,
        password,
        rememberMe,
      });

      const { token, role, username, fullname, email, phone_number } = data;

      if (!token) {
        toast.error("No token received. Please try again.");
        return;
      }

      toast.success(data.message || "Employee Login successful!");

      // Store token and employee details before navigating
      storeAuthToken(token, rememberMe);

      // Store employee details in localStorage
      localStorage.setItem("employeeDetails", JSON.stringify({ role, username, fullname, email, phone_number }));

      // Sign in the employee
      signInEmployee(token, { role, username, fullname, email, phone_number });

      // Navigate to dashboard after everything is set
      navigate("/office/dashboard");

    } catch (error) {
      const message = error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    emailOrUsername,
    setEmailOrUsername,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    rememberMe,
    setRememberMe,
    loading,
    handleSubmit,
  };
};

export default EmployeeLoginLogic;
