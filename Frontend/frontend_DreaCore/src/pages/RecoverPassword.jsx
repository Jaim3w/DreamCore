import React from "react";
import { motion } from "framer-motion";
import olvidasteContra from "../assets/olvidasteContra.png";
import BotonRecu from "../components/BotonRecu";
import BotonRecuW from "../components/BotonRecuW";

const RecoverPassword = () => { //esta pagina es para recuperar la contraseña, se le envia un correo al usuario para que pueda cambiar su contraseña
  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2">
        <div className="p-12 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-green-900 mb-6">DreamCore</h1>
          <h2 className="text-xl text-black  mb-10">¿Olvidaste tu contraseña?</h2>
          <p className="text-base text-gray-600 mb-8 leading-relaxed">
            Para restablecer su contraseña, ingrese su correo electrónico y a continuación envíelo. 
            Se le enviará un correo electrónico con instrucciones sobre cómo completar el proceso.
          </p>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="mb-6 border border-gray-300 rounded-md px-4 py-3 text-base w-full placeholder:text-gray-500 bg-gray-100 text-black"
          />
          <div className="flex gap-6 mb-10">
            <BotonRecuW>Volver al inicio de sesión</BotonRecuW> //los botones son para volver al inicio de sesión y para restablecer la contraseña
            <BotonRecu>Restablecer contraseña</BotonRecu>
          </div>
          {/* Indicadores centrados */}
          <div className="mt-10 flex gap-3 justify-center">
            <span className="w-5 h-1.5 bg-green-800 rounded-full"></span>
            <span className="w-5 h-1.5 bg-green-200 rounded-full"></span>
            <span className="w-5 h-1.5 bg-green-200 rounded-full"></span>
          </div>
        </div> // indicador de por cual pantalla va el usuario.

        <motion.div // animación de la imagen para que aparezca de la derecha a la izquierda
          // y se vea más fluido el cambio de pantalla
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
