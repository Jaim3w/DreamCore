import React, { useEffect, useState } from 'react';

// Importación de react-icons para los iconos
import { FaSignOutAlt, FaUser, FaBars, FaTimes } from 'react-icons/fa';

//Importamos el logo que va en medio
import logo from "../../assets/logonav.png";

// Importación del css del header
import './Header.css';
import { Link } from 'react-router-dom';

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
        
        <div className="social-info">
        </div>
      </div>

      {/* Clase dinámica al hacer scroll */}
      {/* Barra de navegación que se vuelve "sticky" si se hace scroll */}
      <nav className={`nav-bar ${scrolled ? 'sticky' : ''}`}>
        <Link to="/dashboard">Inicio</Link>
        <Link to="/pedidos">Pedidos</Link>

        {/* Logo centrado - solo visible en desktop */}
        <Link to="/" className="logo-container">
          <img src={logo} alt="DreamCore Logo" />
        </Link>

        <Link to="/productos">Productos</Link>
        <Link to="/categories">Categorías</Link>

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
          <Link to="/" className="logo-container-mobile" onClick={closeMobileMenu}>
          </Link>
          <Link to="/dashboard" onClick={closeMobileMenu}>Inicio</Link>
          <Link to="/pedidos" onClick={closeMobileMenu}>Pedidos</Link>
          <Link to="/productos" onClick={closeMobileMenu}>Productos</Link>
          <Link to="/categories" onClick={closeMobileMenu}>Categorías</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;