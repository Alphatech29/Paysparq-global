import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import ErrorBoundary from './utils/ErrorBoundary';
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Home from './pages/home/home';
import NotFound from './pages/NotFound';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import Preload from '../components/preload/Preload'; 
import '@fontsource/inter/400.css'; 
import '@fontsource/inter/500.css'; 
import '@fontsource/inter/600.css'; 
import '@fontsource/inter/700.css'; 


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
  hideHeaderFooter: PropTypes.bool,  // Add the hideHeaderFooter prop here
  hidePreload: PropTypes.bool,  // Add the hidePreload prop here
};


Layout.propTypes = {
  children: PropTypes.node.isRequired,
  hideHeaderFooter: PropTypes.bool,  // Add the hideHeaderFooter prop here
};


function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Layout hideHeaderFooter={false} hidePreload={false}><Home /></Layout>}
          />
          <Route
            path="auth/sign-up"
            element={<Layout hideHeaderFooter={true} hidePreload={false}><SignUp /></Layout>}
          />
          <Route
            path="auth/login"
            element={<Layout hideHeaderFooter={true} hidePreload={false}><SignIn /></Layout>}
          />
          <Route
            path="*"
            element={<Layout hideHeaderFooter={false} hidePreload={false}><NotFound /></Layout>}
          />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}



export default App;