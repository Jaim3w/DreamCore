import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import olvidasteContra from "../assets/olvidasteContra.png";
import { useNavigate } from "react-router-dom";
import BotonRecu from "../components/recuContra/BotonRecu";
import InputDigito from "../components/recuContra/InputDigito";

const VerificarAccount = () => {
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState(Array(5).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputsRef = useRef([]);

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

  const handleVerifyCode = async () => {
    const verificationCode = codigo.join("");

    if (verificationCode.length !== 5) {
      setError("Debes ingresar los 5 dígitos");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:4000/api/verifyCodeEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: verificationCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Código incorrecto o expirado");
      }

      // Si todo va bien → Navega a crear nueva contraseña
      navigate("/newpassword");
    } catch (err) {
      setError(err.message || "Error al verificar el código");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Lado Izquierdo */}
        <div className="p-4 md:p-10 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-4 md:mb-6 text-center md:text-left">
            DreamCore
          </h1>
          <h2 className="text-lg md:text-xl text-black mb-3 text-center md:text-left">
            Revisa tu correo
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed text-center md:text-left">
            Enviamos un código de verificación a la dirección de correo. 
            Escribe los 5 dígitos para saber tu identidad.
          </p>

          {/* Inputs para el código */}
          <div className="flex justify-center md:justify-start gap-3 mb-4">
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

          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-center">
              {error}
            </div>
          )}

          <div className="flex justify-center md:justify-start mb-8">
            <BotonRecu onClick={handleVerifyCode} disabled={loading} className="px-4 py-2 text-sm md:text-base w-fit">
              {loading ? "Verificando..." : "Verificar Código"}
            </BotonRecu>
          </div>

          <p className="text-sm md:text-base text-gray-600 text-center md:text-left">
            ¿Aún no ha llegado tu código?{" "}
            <span
              className="text-green-800 font-semibold cursor-pointer hover:underline"
              onClick={() => window.location.reload()}
            >
              Reenviar código
            </span>
          </p>

          <div className="mt-6 flex gap-2 justify-center md:justify-start">
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
          className="p-4 md:p-10 flex items-center justify-center"
        >
          <img
            src={olvidasteContra}
            alt="Ilustración de verificación"
            className="w-full max-w-xs md:max-w-md object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default VerificarAccount;