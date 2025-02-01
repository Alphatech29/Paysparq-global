import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken") || Cookies.get("authToken");
    const userUid = localStorage.getItem("userUid") || Cookies.get("userUid");
    if (token && userUid) {
      setAuthToken(token);
      setUserUid(userUid);
    }

    setLoading(false); // Set loading state to false after checking for token and uid
  }, []);

  const signIn = (token) => {
    const decodedToken = jwtDecode(token);
    const userUid = decodedToken?.userUid;

    setAuthToken(token);
    setUserUid(userUid);

    // Store in localStorage and Cookies
    localStorage.setItem("authToken", token);
    localStorage.setItem("userUid", userUid);
    Cookies.set("authToken", token, { expires: 7 });
    Cookies.set("userUid", userUid, { expires: 7 });

    // Navigate to dashboard
    navigate("/user/dashboard");
  };

  const logout = async () => {
    try {
      // Clear authentication state
      setAuthToken(null);
      setUserUid(null);
  
      // Remove from local storage and cookies
      localStorage.removeItem("authToken");
      localStorage.removeItem("userUid");
      Cookies.remove("authToken");
      Cookies.remove("userUid");
  
      // Redirect to login page
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred while logging out");
    }
  };
  

  const authenticated = !!authToken && !!userUid;

  return (
    <AuthContext.Provider value={{ authenticated, loading, authToken, userUid, setAuthToken, setUserUid, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
