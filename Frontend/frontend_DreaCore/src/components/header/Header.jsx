import React, { useEffect, useState } from 'react';

// Importación de react-icons para los iconos
import { FaFacebookF, FaInstagram, FaWhatsapp, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';

// Importación para redirección
import { useNavigate } from 'react-router-dom';

//Importamos el logo que va en medio
import logo from "../../assets/logonav.png";

// Importación del css del header
import './Header.css';

// Definimos el componente funcional 
const Header = ({ onOpenCart }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate(); // ← agregado

  const onOpenPerfil = () => {
    navigate('/perfil'); // ← redirige a /perfil
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

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
          <FaShoppingCart className="icon" onClick={onOpenCart} style={{ cursor: 'pointer' }} />
          <FaUser className="icon" onClick={onOpenPerfil} style={{ cursor: 'pointer' }} /> {/* ← corregido */}
        </div>
      </div>

      <nav className={`nav-bar ${scrolled ? 'sticky' : ''}`}>
        <a href="/home">Inicio</a>
        <a href="/about">Quiénes Somos</a>

        <a href="/" className="logo-container">
          <img src={logo} alt="DreamCore Logo" />
        </a>

        <a href="/productos">Productos</a>
        <a href="/contactanos">Contáctanos</a>

        <button 
          className="hamburger-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`nav-links-mobile ${mobileMenuOpen ? 'nav-links-mobile-open' : ''}`}>
          <a href="/" className="logo-container-mobile" onClick={closeMobileMenu}></a>
          <a href="/home" onClick={closeMobileMenu}>Inicio</a>
          <a href="/about" onClick={closeMobileMenu}>Quiénes Somos</a>
          <a href="/productos" onClick={closeMobileMenu}>Productos</a>
          <a href="/contactanos" onClick={closeMobileMenu}>Contáctanos</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
