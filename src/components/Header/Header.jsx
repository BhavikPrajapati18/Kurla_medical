import React from 'react'
import Logo from '../SubComps/Logo'
import { useNavigate } from 'react-router-dom'

function Header() {

  const navigate = useNavigate()

  const navItems = [
    {
      name : "Home",
      nav : "/",
      active : true
    },
    {
      name : "Store",
      nav : "/store",
      active : true
    },  {
      name : "About",
      nav : "/about",
      active : true
    },  {
      name : "Contact",
      nav : "/",
      active : true
    },
    {
      name : "Cart",
      nav : "/cart",
      active : true
    }
  ]


  return (
    <div>
      <Link to="/">
      <Logo/>
      </Link>
      <div>
        <ul>
        {navItems.map((item) => 
        item.active ? (  
        <li key={item.name} >
          <button onClick={() => navigate(item.nav)}>
            {item.name}
          </button>
        </li>
        ): null
        )}
        </ul>
      </div>
    </div>
  )
}

export default Header
