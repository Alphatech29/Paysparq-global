import React, { useState, useEffect } from "react";
import { AuthContext } from "../control/AuthContext"; 

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { authenticated} = AuthContext(); 

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 ${
        scrolled ? "bg-primary-100" : "bg-transparent"
      } backdrop-blur-md transition-all duration-300`}
      style={{
        backgroundColor: scrolled ? "rgba(130, 53, 12, 0.9)" : "transparent",
      }}
    >
      <div className="pc:px-24 mobile:px-5 mobile:pt-4 pc:py-2 flex items-center justify-between mx-auto">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="/image/footer-logo.png"
            className="h-12"
            alt="Paysparq Logo"
          />
        </a>

        <div className="nav-menu flex items-end justify-end w-[50%]">
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-base text-paysparq rounded-lg pc:hidden focus:outline-none focus:ring-1 focus:ring-paysparq border border-paysparq"
            aria-controls="navbar-default"
            aria-expanded={menuOpen ? "true" : "false"}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`pc:block ${menuOpen ? "block" : "hidden"}`}
            id="navbar-default"
          >
            <ul className="font-medium w-full items-end justify-end text-base font-interSB pc:flex gap-6 mobile:hidden">
              <li>
                <a href="/" className="py-1 text-white" aria-current="page">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="py-1 text-white">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="py-1 text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="py-1 text-white">
                  Contact
                </a>
              </li>
              {authenticated ? (
                <li>
                 <a
                    href="/user.dashboard"
                    className="text-white text-base bg-primary-600 rounded-md px-5 py-2 hover:border hover:border-primary-600 hover:bg-transparent !hover:border-primary-600"
                  >
                    Dashboard
                  </a>
                </li>
              ) : (
                <li>
                  <a
                    href="/auth/login"
                    className="text-white text-base bg-primary-600 rounded-md px-5 py-2 hover:border hover:border-primary-600 hover:bg-transparent !hover:border-primary-600"
                  >
                    Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
