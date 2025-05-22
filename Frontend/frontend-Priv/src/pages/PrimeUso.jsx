import React from "react";
import { useNavigate } from 'react-router-dom';
import dreamCore from "../assets/dreamCore.png";
import linea from "../assets/linea.png"; // Subrayado
import BotonGenerico from "../components/BotonGenerico";

const PrimeUso = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/Dashboard'); // Cambia '/home' por tu ruta real
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-32 py-16">
      {/* Imagen decorativa al fondo derecho */}
      <img
        src={dreamCore}
        alt="Decoración DreamCore"
        className="absolute right-0 top-0 h-full w-[40%] lg:w-[30%] object-cover z-0 opacity-20 lg:opacity-100"
      />

      {/* Contenido principal */}
      <div className="relative z-10 w-full lg:max-w-3xl text-center lg:text-left">
        {/* Título */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#12123E] leading-tight mb-6">
          ¡Empieza a <span className="relative inline-block">
            crear
            <img
              src={linea}
              alt="Subrayado"
              className="absolute -bottom-2 left-0 w-full h-3 object-contain"
            />
          </span>
          <br className="hidden sm:block" />
          momentos <br className="hidden sm:block" />
          inolvidables!
        </h1>

        {/* Descripción */}
        <p className="text-gray-600 text-base md:text-lg mb-10 max-w-2xl mx-auto lg:mx-0">
          ¡Bienvenido a DreamCore! Estamos emocionados de que empieces a disfrutar de todo lo que tenemos para ofrecerte. Esta app está diseñada para hacer tu experiencia más fácil e intuitiva.
        </p>

        {/* Botón */}
        <div className="flex justify-center lg:justify-start">
          <BotonGenerico
            label="Continuar"
            onClick={handleContinue}
            className="text-lg sm:text-xl px-8 sm:px-10 py-3 sm:py-4 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PrimeUso;
