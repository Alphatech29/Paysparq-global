import React from "react";
import PropTypes from "prop-types";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Preload from "../../components/preload/Preload";

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

export default Layout;
