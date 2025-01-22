import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../src/context/authContext";
import LoadingSpinner from "../preload/ApiLoading";

const PrivateRoute = () => {
  const { authenticated } = useContext(AuthContext);

  if (authenticated === null) {
   
    return(<LoadingSpinner />);
  }

  return authenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
