import React from "react";
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
} from "lucide-react";

function Header() {
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

  return (
    <header className="bg-white shadow-lg">
      <Container>
        <nav className="flex items-center py-4">
          {/* Logo Section */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Logo />
          </div>

          {/* Navigation Links */}
          <ul className="flex ml-auto space-x-6 items-center">
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
            {/* Logout Button */}
            {authStatus && (
              <li>
                <Logout />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
