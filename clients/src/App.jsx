import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";
import ErrorBoundary from "./utils/ErrorBoundary";
import PrivateRoute from "../components/privateRoute/privateRoute";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Home from "./pages/home/home";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import Dashboard from "./pages/user/Dashboard/Dashboard";
import Preload from "../components/preload/Preload";
import AuthProvider from "./context/authContext";

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
    <ErrorBoundary>
      <AuthProvider>
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

            {/* Private Routes */}
            <Route path="/user/*" element={<PrivateRoute />}>
              <Route
                path="dashboard"
                element={
                  <Layout hideHeaderFooter={true} hidePreload={true}>
                    <Dashboard />
                  </Layout>
                }
              />
              
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
