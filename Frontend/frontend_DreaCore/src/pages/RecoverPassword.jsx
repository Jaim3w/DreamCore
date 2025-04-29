import React from "react";
import { useNavigate } from "react-router-dom"; // Importamos el hook para navegar
import { motion } from "framer-motion";
import olvidasteContra from "../assets/olvidasteContra.png";
import BotonRecu from "../components/recuContra/BotonRecu";
import BotonRecuW from "../components/recuContra/BotonRecuW";

const RecoverPassword = () => {
  const navigate = useNavigate(); // Creamos la función navigate

  const handleGoToLogin = () => {
    navigate("/"); // Ruta para volver al inicio de sesión
  };

  const checknumber = () => {
    navigate("/checknumber"); // Ruta para ir a crear una nueva contraseña
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Texto e Inputs */}
        <div className="p-4 md:p-12 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-4 md:mb-6 text-center md:text-left">DreamCore</h1>
          <h2 className="text-lg md:text-xl text-black font-semibold mb-6 md:mb-10 text-center md:text-left">
            ¿Olvidaste tu contraseña?
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 leading-relaxed text-center md:text-left">
            Para restablecer su contraseña, ingrese su correo electrónico y a continuación envíelo. 
            Se le enviará un correo electrónico con instrucciones sobre cómo completar el proceso.
          </p>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="mb-6 border border-gray-300 rounded-md px-4 py-3 text-sm md:text-base w-full placeholder:text-gray-500 bg-gray-100 text-black"
          />
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-8 md:mb-10">
            <BotonRecuW onClick={handleGoToLogin}>
              Volver al inicio de sesión
            </BotonRecuW>
            <BotonRecu onClick={checknumber}>
              Restablecer contraseña
            </BotonRecu>
          </div>
          {/* Indicadores centrados */}
          <div className="mt-6 md:mt-10 flex gap-3 justify-center md:justify-start">
            <span className="w-4 md:w-5 h-1.5 bg-green-800 rounded-full"></span>
            <span className="w-4 md:w-5 h-1.5 bg-green-200 rounded-full"></span>
            <span className="w-4 md:w-5 h-1.5 bg-green-200 rounded-full"></span>
          </div>
        </div>

        {/* Imagen */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 md:p-10 flex items-center justify-center"
        >
          <img
            src={olvidasteContra}
            alt="Grupo de personas hablando"
            className="w-full max-w-xs md:max-w-md object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default RecoverPassword;
