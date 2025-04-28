import React from "react";
import { motion } from "framer-motion";
import olvidasteContra from "../assets/olvidasteContra.png";
import BotonRecu from "../components/BotonRecu";
import { useNavigate } from "react-router-dom"; // Importa correctamente useNavigate

const RecoverPassword = () => {
  const navigate = useNavigate(); // Usamos el hook useNavigate

  const handleGoToLogin = () => {
    navigate("/"); // Navegamos a la página de login
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Lado Izquierdo */}
        <div className="p-4 md:p-12 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-4 md:mb-6 text-center md:text-left">
            DreamCore
          </h1>
          <h2 className="text-lg md:text-xl text-black mb-3 text-center md:text-left">
            Crea una nueva contraseña
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 leading-relaxed text-center md:text-left">
            Para restablecer tu contraseña, ingresa una nueva contraseña que tenga más de 8 caracteres y al menos una mayúscula.
          </p>

          {/* Inputs */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs text-gray-600 mb-2 text-center md:text-left">
                Escribe tu nueva contraseña
              </p>
              <input
                type="password"
                placeholder="Escribe tu contraseña"
                className="border border-gray-300 rounded-lg px-4 py-3 text-sm w-full placeholder:text-gray-600 text-black bg-[rgba(196,196,196,0.27)]"
              />
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-2 text-center md:text-left">
                Confirma tu contraseña
              </p>
              <input
                type="password"
                placeholder="Confirma tu contraseña"
                className="border border-gray-300 rounded-lg px-4 py-3 text-sm w-full placeholder:text-gray-600 text-black bg-[rgba(196,196,196,0.27)]"
              />
            </div>
          </div>

          {/* Botón */}
          <div className="flex justify-center md:justify-start mt-6 mb-10">
            <BotonRecu onClick={handleGoToLogin} className="w-full md:w-auto px-6 py-3 text-sm">
              Restablecer contraseña
            </BotonRecu>
          </div>

          {/* Indicadores */}
          <div className="mt-8 flex gap-3 justify-center">
            <span className="w-5 h-1.5 bg-green-800 rounded-full"></span>
            <span className="w-5 h-1.5 bg-green-800 rounded-full"></span>
            <span className="w-5 h-1.5 bg-green-800 rounded-full"></span>
          </div>
        </div>

        {/* Imagen animada */}
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
