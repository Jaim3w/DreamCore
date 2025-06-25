import React, { useEffect, useState } from 'react';

// Importación de react-icons para los iconos
import { FaFacebookF, FaInstagram, FaWhatsapp, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';

//Importamos el logo que va en medio
import logo from "../../assets/logonav.png";

// Importación del css del header
import './Header.css';

// Definimos el componente funcional 
const Header = ({ onOpenCart }) => {
  // Creamos un estado para saber si el usuario ha hecho scroll
  const [scrolled, setScrolled] = useState(false);
  // Estado para controlar el menú móvil
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Función que actualiza el estado
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

     // Escuchamos el evento 'scroll' en la ventana
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para toggle del menú móvil
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Función para cerrar el menú al hacer click en un enlace
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="header-container">
      {/* Barra superior con información de contacto y redes sociales */}
      <div className="top-bar">
        <div className="contact-info">
          <span>dreamcore@gmail.com</span>
          <span>| (503) 7656 1893</span>
        </div>

        <div className="social-info">
          <span>DreamCore</span>
          {/* Enlace a la página de Facebook */}
          <a href="https://www.facebook.com/share/16CoHB2aGm/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="icon" />
          </a>
          {/* Enlace a Instagram */}
          <a href="https://www.instagram.com/emiinxu?igsh=MXNiZTN5Yzg0cXN6Mw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="icon" />
          </a>
          {/* Enlace a WhatsApp */}
          <a href="https://wa.me/50376561893" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="icon" />
          </a>
          <span>| Eventos Boutique</span>
          <FaShoppingCart className="icon" onClick={onOpenCart} style={{ cursor: 'pointer' }} />
          {/* Enlace a WhatsApp */}
        </div>
      </div>

      {/* Clase dinámica al hacer scroll */}
      {/* Barra de navegación que se vuelve "sticky" si se hace scroll */}
      <nav className={`nav-bar ${scrolled ? 'sticky' : ''}`}>
        <a href="/home">Inicio</a>
        <a href="/about">Quiénes Somos</a>

        {/* Logo centrado - solo visible en desktop */}
        <a href="/" className="logo-container">
          <img src={logo} alt="DreamCore Logo" />
        </a>

        <a href="/productos">Productos</a>
        <a href="/contactanos">Contáctanos</a>

        {/* Botón hamburguesa - solo visible en móvil */}
        <button 
          className="hamburger-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menú de navegación móvil */}
        <div className={`nav-links-mobile ${mobileMenuOpen ? 'nav-links-mobile-open' : ''}`}>
          {/* Logo en el menú móvil */}
          <a href="/" className="logo-container-mobile" onClick={closeMobileMenu}>
            
          </a>
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