import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../src/context/authContext";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { authenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll); 
    return () => window.removeEventListener("scroll", handleScroll); 
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 ${
        scrolled ? "bg-primary-100" : "bg-transparent"
      } backdrop-blur-md transition-all duration-300 pt-1`}
      style={{
        backgroundColor: scrolled ? "rgba(130, 53, 12, 0.9)" : "transparent", 
      }}
    >
      <div className="px-24 flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/image/footer-logo.png" className="h-12" alt="Paysparq Logo" />
        </a>

        <div className="nav-menu md:block md:w-auto justify-center items-center flex">
         <div>
         <ul className="font-medium text-base font-interSB flex p-4 md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse">
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
                <a href="/user/dashboard" className="text-white text-base bg-primary-600 rounded-md px-5 py-2 hover:border hover:border-primary-600 hover:bg-transparent !hover:border-primary-600">
                  Dashboard
                </a>
              </li>
            ) : (
              <li>
                <a href="/auth/login" className="text-white text-base bg-primary-600 rounded-md px-5 py-2 hover:border hover:border-primary-600 hover:bg-transparent !hover:border-primary-600">
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