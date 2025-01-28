import React, { useState } from "react";
import Logo from "../SubComps/Logo";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "./LogoutBtn";
import { Container } from "../index";
import {
  Home,
  ShoppingCart,
  Store,
  Contact,
  UserPlus,
  LogIn,
  BookText,
  Menu,
  X,
} from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", icon: <Home />, nav: "/", active: true },
    { name: "Login", icon: <LogIn />, nav: "/login", active: !authStatus },
    { name: "Signin", icon: <UserPlus />, nav: "/signin", active: !authStatus },
    { name: "Store", icon: <Store />, nav: "/store", active: authStatus },
    { name: "About", icon: <BookText />, nav: "/about", active: authStatus },
    { name: "Contact", icon: <Contact />, nav: "/contact", active: authStatus },
    { name: "Cart", icon: <ShoppingCart />, nav: "/cart", active: authStatus },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg">
      <Container>
        <nav className="relative">
          <div className="flex items-center justify-between py-4">
            {/* Logo Section */}
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <Logo />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name} className="relative group">
                    <button
                      className="flex items-center text-lg px-4 py-2 text-[#004080] hover:bg-gray-100 rounded-lg duration-200"
                      onClick={() => navigate(item.nav)}
                    >
                      {item.icon && <span className="mr-2">{item.icon}</span>}
                      {item.name}
                    </button>
                    {/* Hover Indicator */}
                    <div className="absolute left-0 right-0 h-1 bg-[#004080] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  </li>
                ) : null
              )}
              {/* Desktop Logout Button */}
              {authStatus && (
                <li>
                  <Logout />
                </li>
              )}
            </ul>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden absolute z-50 w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? "opacity-100 visible max-h-screen"
                : "opacity-0 invisible max-h-0"
            }`}
          >
            <ul className="py-2">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      className="flex items-center w-full text-lg px-6 py-3 text-[#004080] hover:bg-gray-100"
                      onClick={() => handleNavigation(item.nav)}
                    >
                      {item.icon && <span className="mr-3">{item.icon}</span>}
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {/* Mobile Logout Button */}
              {authStatus && (
                <li className="px-4 py-2">
                  <Logout />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
