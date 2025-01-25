// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Home from "./pages/home/home";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import UserRoutes from "./userRoute/UserRoutes"; 
import Preload from "../components/preload/Preload";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/reduxStore";
import { checkAuth } from "./redux/authSlice";

function Layout({ children, hideHeaderFooter, hidePreload }) {
  return (
    <>
      {!hidePreload && <Preload />}
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  hideHeaderFooter: PropTypes.bool,
  hidePreload: PropTypes.bool,
};

function App() {
  return (
    <Provider store={store}> 
      <AuthChecker /> {/* Dispatch checkAuth */}
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <Layout hideHeaderFooter={false} hidePreload={false}>
                <Home />
              </Layout>
            }
          />
          <Route
            path="auth/sign-up"
            element={
              <Layout hideHeaderFooter={true} hidePreload={false}>
                <SignUp />
              </Layout>
            }
          />
          <Route
            path="auth/login"
            element={
              <Layout hideHeaderFooter={true} hidePreload={false}>
                <SignIn />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout hideHeaderFooter={false} hidePreload={false}>
                <NotFound />
              </Layout>
            }
          />

          {/* User protected routes */}
          <Route
            path="user/*"
            element={<UserRoutes />}
          />
        </Routes>
      </Router>
    </Provider>
  );
}

function AuthChecker() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth()); // Dispatch checkAuth action to check authentication status
  }, [dispatch]);
  return null;
}

export default App;
