import React, {useContext} from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../control/AuthContext"; 
import LoadingSpinner from "../preload/ApiLoading";

const PrivateRoute = ({ children }) => {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  return authenticated ? children : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
