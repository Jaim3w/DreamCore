// Importamos React, necesario para usar JSX
import React from 'react';

//Importamos el css del footer
import './Footer.css';

// Definimos el componente funcional Footer
const Footer = () => {
  return (
    <footer className="footer">

{/* Texto que irá dentro del footer */}
      <p>
        Copyright © 2025 DreamCore. Todos los derechos reservados.{' '}
        <a href="/terminos">Términos y Condiciones</a>
      </p>
    </footer>
  );
};

export default Footer;
