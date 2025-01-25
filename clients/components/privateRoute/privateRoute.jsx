// src/components/PrivateRoute.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../preload/ApiLoading"; 
import { selectAuth, selectLoading, checkAuth } from "../../src/redux/authSlice"; 

const PrivateRoute = ({ children }) => {
  const authenticated = useSelector(selectAuth);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth()); // Check authentication status on mount
  }, [dispatch]);

  // Show loading spinner if authentication is still being checked
  if (loading || authenticated === null) {
    return <LoadingSpinner />;
  }

  // If user is not authenticated, redirect to login page
  if (authenticated === false) {
    return <Navigate to="/auth/login" replace />;
  }

  // If authenticated, render the child component
  return children;
};

export default PrivateRoute;
