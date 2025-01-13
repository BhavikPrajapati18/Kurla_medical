import React from "react";
import Logo from "../SubComps/Logo";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "./LogoutBtn";
import { Container } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      nav: "/",
      active: true,
    }, {
      name: "Login",
      nav: "/login",
      active: !authStatus,
    }, {
      name: "Signin",
      nav: "/Signin",
      active: !authStatus,
    },
    {
      name: "Store",
      nav: "/store",
      active: authStatus,
    },
    {
      name: "About",
      nav: "/about",
      active: authStatus,
    },
    {
      name: "Contact",
      nav: "/contact",
      active: authStatus,
    },
    {
      name: "Cart",
      nav: "/cart",
      active: authStatus,
    },
  ];

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
            <Logo width="50px"/>
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={ item.name }>
                <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={() => navigate(item.nav)}>
                  {item.name}
                </button>
              </li>
            ) : null
            )}
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
