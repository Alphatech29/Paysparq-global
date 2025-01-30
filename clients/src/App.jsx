// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import Layout from "../components/control/Layout";
import UserRoutes from "./userRoute/UserRoutes"; 
import PrivateRoute from "../components/privateRoute/privateRoute"; 
import { AuthProvider } from "../components/control/AuthContext";

function App() {
  return (
   
    <Router>
       <AuthProvider>
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

        {/* Private Route */}
        <Route path="user/*" element={<PrivateRoute><UserRoutes /></PrivateRoute>}/>
        
      </Routes>
      </AuthProvider>
    </Router>
  
  );
}

export default App;
