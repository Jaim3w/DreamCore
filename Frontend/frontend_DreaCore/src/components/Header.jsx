import React, { useEffect, useState } from 'react';

// Importación de react-icons para los iconos
import { FaFacebookF, FaInstagram, FaWhatsapp, FaShoppingCart, FaUser } from 'react-icons/fa';

//Importamos el logo que va en medio
import logo from "../assets/logonav.png";

// Importación del css del header
import './Header.css';

// Definimos el componente funcional 
const Header = () => {
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
     // Contenedor principal del encabezado
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
          <FaShoppingCart className="icon" />
          <FaUser className="icon" />
        </div>
      </div>

      {/* Clase dinámica al hacer scroll */}
      {/* Barra de navegación que se vuelve "sticky" si se hace scroll */}
      <nav className={`nav-bar ${scrolled ? 'sticky' : ''}`}>
        <a href="/">Inicio</a>
        <a href="/about">Quiénes Somos</a>

        {/* Logo centrado */}
        <a href="/" className="logo-container">
          <img src={logo} alt="DreamCore Logo" />
        </a>
        <a href="/productos">Productos</a>
        <a href="/contactanos">Contáctanos</a>
      </nav>
    </header>
  );
};

export default Header;
