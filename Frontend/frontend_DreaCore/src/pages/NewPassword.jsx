import React from "react";
import { motion } from "framer-motion";
import olvidasteContra from "../assets/olvidasteContra.png";
import BotonRecu from "../components/BotonRecu";
import BotonRecuW from "../components/BotonRecuW";

const RecoverPassword = () => {
  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2">
        <div className="p-12 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-green-900 mb-6">DreamCore</h1>
          <h2 className="text-xl text-black  mb-3">Crea una nueva contraseña</h2>
          <p className="text-base text-gray-600 mb-8 leading-relaxed">
          Para restablecer su contraseña, ingrese su nueva contraseña que sea mayor a 8 carácteres y contar con una mayúscula.
          </p>
          <p className="text-base text-gray-600 leading-relaxed text-xs">Escriba su Nueva Contraseña</p>
          <input
  type="password"
  placeholder="Escribe tu contraseña"
  className="mb-6 border border-gray-300 rounded-lg px-4 py-3 text-sm w-full placeholder:text-gray-600 text-black bg-[rgba(196,196,196,0.27)]"
/>
          <p className="text-base text-gray-600 leading-relaxed text-xs">Confirme su Contraseña</p>
         
<input
  type="password"
  placeholder="Confirma tu contraseña"
  className="mb-6 border border-gray-300 rounded-lg px-4 py-3 text-sm w-full placeholder:text-gray-600 text-black bg-[rgba(196,196,196,0.27)]"
/>
          <div className="flex gap-6 mb-10">
          <BotonRecu className="w-full">Restablecer contraseña</BotonRecu>
          </div>
          {/* Indicadores centrados */}
          <div className="mt-10 flex gap-3 justify-center">
            <span className="w-5 h-1.5 bg-green-800 rounded-full"></span>
            <span className="w-5 h-1.5 bg-green-800 rounded-full"></span>
            <span className="w-5 h-1.5 bg-green-800 rounded-full"></span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-10 flex items-center justify-center"
        >
          <img
            src={olvidasteContra}
            alt="Grupo de personas hablando"
            className="max-h-[400px] object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default RecoverPassword;
