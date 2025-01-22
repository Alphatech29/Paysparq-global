import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import LoadingSpinner from "../../components/preload/ApiLoading";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const now = Math.floor(Date.now() / 1000);
        setAuthenticated(payload.exp > now); 
      } catch (error) {
        setAuthenticated(false); 
      }
    } else {
      setAuthenticated(false); 
    }
    setLoading(false); 
  }, []);

  const logout = () => {
    Cookies.remove("authToken");
    setAuthenticated(false);
  };

  if (loading) {
    return(<LoadingSpinner/>);
  }

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
