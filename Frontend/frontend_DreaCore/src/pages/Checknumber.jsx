import React from "react";
import { motion } from "framer-motion";
import olvidasteContra from "../assets/olvidasteContra.png";
import BotonRecu from "../components/BotonRecu";
import InputDigito  from "../components/InputDigito";
import  { useState } from "react";
import { useRef } from "react"; 



const VerificarCodigo = () => {
    const [codigo, setCodigo] = useState(Array(5).fill("")); 
    const inputsRef = useRef([]); // referencias para cambiar el foco automáticamente
    const handleChange = (index, value) => {
        const newCodigo = [...codigo];
        newCodigo[index] = value;
        setCodigo(newCodigo);
    
        if (value && index < 4) {
          focusNext(index);
        }
      };
    
      const handleBackspace = (index) => {
        if (index > 0) {
          focusPrev(index);
        }
      };
    
      const focusNext = (index) => {
        const nextInput = inputsRef.current[index + 1];
        if (nextInput) nextInput.focus();
      };
    
      const focusPrev = (index) => {
        const prevInput = inputsRef.current[index - 1];
        if (prevInput) prevInput.focus();
      };
  
  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2">
        {/* Lado Izquierdo */}
        <div className="p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-green-900 mb-6">DreamCore</h1>
          <h2 className="text-xl text-black  mb-3">Revisa tu correo</h2>
          <p className="text-sm text-gray-600 mb-6">
            Enviamos un código de verificación a la dirección de correo. Escribe los 5 dígitos para saber tu identidad.
          </p>

          {/* Inputs para el código */}
          <div className="flex gap-3 mb-6">
            {codigo.map((digit, i) => (
              <InputDigito
                key={i}
                index={i}
                value={digit}
                onChange={handleChange}
                onBackspace={handleBackspace}
                focusNext={(i) => focusNext(i)}
                focusPrev={(i) => focusPrev(i)}
                ref={(el) => (inputsRef.current[i] = el)}
              />
            ))}
          </div>


    
          <div className="flex justify-self-center mb-6">
  <BotonRecu className="px-4 py-1.5 text-sm w-fit">Verificar Código</BotonRecu>
</div>
          {/* Reenviar código */}
          <p className=" py-4 text-sm text-gray-600 text-center max-md:">
            ¿Aún no ha llegado tu código?{" "}
            <span className="text-green-800 font-semibold cursor-pointer hover:underline">
              Reenviar código
            </span>
          </p>

          {/* Indicadores */}
          <div className="mt-6 flex gap-2 justify-center">
            <span className="w-4 h-1 bg-green-800 rounded-full"></span>
            <span className="w-4 h-1 bg-green-800 rounded-full"></span>
            <span className="w-4 h-1 bg-green-200 rounded-full"></span>
          </div>
        </div>

        {/* Imagen animada */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="p-10 flex items-center justify-center"
        >
          <img
            src={olvidasteContra}
            alt="Ilustración de verificación"
            className="max-h-[400px] object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default VerificarCodigo;
