import React from "react";
import Logo from "../SubComps/Logo";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "./LogoutBtn";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      nav: "/",
      active: true,
    },
    {
      name: "Store",
      nav: "/store",
      active: !authStatus,
    },
    {
      name: "About",
      nav: "/about",
      active: !authStatus,
    },
    {
      name: "Contact",
      nav: "/",
      active: !authStatus,
    },
    {
      name: "Cart",
      nav: "/cart",
      active: !authStatus,
    },
  ];

  return (
    <div>
      <Link to="/">
        <Logo />
      </Link>
      <div>
        <ul>
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button onClick={() => navigate(item.nav)}>{item.name}</button>
              </li>
            ) : null
          )}
        </ul>
        <Logout />
      </div>
    </div>
  );
}

export default Header;
