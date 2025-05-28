import React, { useEffect, useState } from 'react';

// Importación de react-icons para los iconos
import { FaSignOutAlt, FaUser } from 'react-icons/fa';

//Importamos el logo que va en medio
import logo from "../../assets/logonav.png";

// Importación del css del header
import './Header.css';

// Definimos el componente funcional 
const Header = ({ onOpenCart }) => {
  // Creamos un estado para saber si el usuario ha hecho scroll
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Función que actualiza el estado
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

     // Escuchamos el evento 'scroll' en la ventana
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header-container">
      {/* Barra superior con información de contacto y redes sociales */}
      <div className="top-bar">
        
        <div className="social-info">
          <FaSignOutAlt className="icon" onClick={onOpenCart} style={{ cursor: 'pointer' }} />
          <FaUser className="icon" />
        </div>
      </div>

      {/* Clase dinámica al hacer scroll */}
      {/* Barra de navegación que se vuelve "sticky" si se hace scroll */}
      <nav className={`nav-bar ${scrolled ? 'sticky' : ''}`}>
        <a href="/">Inicio</a>
        <a href="/about">Pedidos</a>

        {/* Logo centrado */}
        <a href="/" className="logo-container">
          <img src={logo} alt="DreamCore Logo" />
        </a>
        <a href="/productos">Productos</a>
        <a href="/categories">Categorías</a>
      </nav>
    </header>
  );
};

export default Header;