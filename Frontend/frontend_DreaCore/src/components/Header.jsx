import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from "../assets/logonav.png";
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header-container">
      <div className="top-bar">
        <div className="contact-info">
          <span>dreamcore@gmail.com</span>
          <span>| (503) 7656 1893</span>
        </div>

        <div className="social-info">
          <span>DreamCore</span>
          <a href="https://www.facebook.com/share/16CoHB2aGm/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="icon" />
          </a>
          <a href="https://www.instagram.com/emiinxu?igsh=MXNiZTN5Yzg0cXN6Mw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="icon" />
          </a>
          <a href="https://wa.me/50376561893" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="icon" />
          </a>
          <span>| Eventos Boutique</span>
          <FaShoppingCart className="icon" />
          <FaUser className="icon" />
        </div>
      </div>

      {/* Añadimos clase dinámica al hacer scroll */}
      <nav className={`nav-bar ${scrolled ? 'sticky' : ''}`}>
        <a href="/">Inicio</a>
        <a href="/about">Quiénes Somos</a>
        <a href="/" className="logo-container">
          <img src={logo} alt="DreamCore Logo" />
        </a>
        <a href="/productos">Productos</a>
        <a href="#">Contáctanos</a>
      </nav>
    </header>
  );
};

export default Header;
