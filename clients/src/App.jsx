// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import LogIn from "./pages/employees/auth/login";
import Layout from "../components/control/Layout";
import UserRoutes from "./userRoute/UserRoutes"; 
import PrivateRoute from "../components/privateRoute/privateRoute"; 
import { AuthProvider } from "../components/control/AuthContext";
import{EmployeeAuthProvider} from "../components/control/EmployeeAuthContext"
import EmployeeRoutes from "./pages/employees/employeeRoute/EmployeeRoutes";
import EmployeePrivateRoute from "../components/employees/EmployeePrivateRoute/EmployeePrivateRoute";

function App() {
  return (
   
    <Router>
       <AuthProvider>
        <EmployeeAuthProvider>
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
          path="workforce/login"
          element={
            <Layout hideHeaderFooter={true} hidePreload={false}>
              <LogIn />
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

         {/* Employee Private Route */}
         <Route path="employee/*" element={<EmployeePrivateRoute><EmployeeRoutes /></EmployeePrivateRoute>}/>

         {/* Private Route */}
         <Route path="user/*" element={<PrivateRoute><UserRoutes /></PrivateRoute>}/>
        
      </Routes>
      </EmployeeAuthProvider>
      </AuthProvider>
    </Router>
  
  );
}

export default App;
