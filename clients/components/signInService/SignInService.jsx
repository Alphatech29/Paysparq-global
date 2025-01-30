import { useState, useContext } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../control/AuthContext";

const useSignInLogic = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signIn } = useContext(AuthContext);

  const storeAuthToken = (token, rememberMe) => {
    const expirationDays = rememberMe ? 7 : 1;
    
    console.log("Token received:", token);
  
    if (!token || token.split('.').length !== 3) {
      toast.error("Invalid token format.");
      return;
    }
  
    try {
      const decodedToken = jwtDecode(token);
      const userUid = decodedToken?.userUid;
      console.log("User UID:", userUid);
  
      Cookies.set("authToken", token, {
        expires: expirationDays,
        secure: process.env.NODE_ENV === "production" || window.location.protocol === 'https:',
        sameSite: "strict",
      });
  
      if (userUid) {
        Cookies.set("userUid", userUid, {
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
      const { data } = await axios.post("/api/auth/login", {
        emailOrUsername,
        password,
        rememberMe,
      });
  
      console.log("Received response:", data); 
  
      const token = data.token;
      if (!token) {
        toast.error("No token received. Please try again.");
        return;
      }
  
      console.log("Received token:", token); 
  
      toast.success(data.message || "Login successful!");
      storeAuthToken(token, rememberMe);
      signIn(token); 
    } catch (error) {
      const message = error.response?.data?.message || "An error occurred. Please try again.";
      if (error.response?.data?.error === "Too many login attempts") {
        toast.error("Too many login attempts. Please try again after 5 minutes.");
      } else {
        toast.error(message);
      }
  
      console.error("Login error:", error);
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

export default useSignInLogic;
