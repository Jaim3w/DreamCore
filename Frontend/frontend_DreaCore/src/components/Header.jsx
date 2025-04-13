import React from 'react';
//librería par los iconos de arribita
import { FaFacebookF, FaInstagram, FaWhatsapp, FaShoppingCart, FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BsTelephone } from 'react-icons/bs';
//importe el logo que va en medio
import logo from "../assets/logonav.png";

//Css del header
import './Header.css';

const Header = () => {
  return (
    <header className="header-container">
      {/* Parte de arribita informartiva */}
      <div className="top-bar">
        <div className="contact-info">
          <span><MdEmail className="icon" /> dreamcore@gmail.com</span>
          <span><BsTelephone className="icon" /> |  (503) 7656 1893</span>
        </div>
        <div className="social-info">
          <span>DreamCore</span>

          {/* Redes sociales de DreamCore */}
          <a href="https://www.facebook.com/share/16CoHB2aGm/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
    <FaFacebookF className="icon" />
  </a>
  <a href="https://www.instagram.com/emiinxu?igsh=MXNiZTN5Yzg0cXN6Mw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
    <FaInstagram className="icon" />
  </a>
  <a href="https://wa.me/50376561893" target="_blank" rel="noopener noreferrer">
    <FaWhatsapp className="icon" />
  </a>
          <span>|  Eventos Boutique</span>
          <FaUser className="icon" />
          <FaShoppingCart className="icon" />
        </div>
      </div>

      {/* Nav bar */}
      <nav className="nav-bar">
        <a href="#">Inicio</a>
        <a href="#">Quiénes Somos</a>

        {/* Logo de en medio */}
        <a href="#" className="logo-container">
          <img src={logo} alt="DreamCore Logo" />
        </a>
        <a href="#">Productos</a>
        <a href="#">Contáctanos</a>
      </nav>
    </header>
  );
};

export default Header;
