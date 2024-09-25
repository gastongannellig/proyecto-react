import React from "react";
import "../styles/navbar.scss";
import CartWidget from "./CartWidget";
import TitleLogo from "./titleLogo";

const NavBar = () => {
  return (
    <nav className="navbar">
      <TitleLogo />
      <ul className="navbar-menu">
        <li>
          <a href="/">Inicio</a>
        </li>
        <li>
          <a href="/shop">Tienda</a>
        </li>
        <li>
          <a href="/contact">Contacto</a>
        </li>
      </ul>
      <CartWidget />
    </nav>
  );
};

export default NavBar;
