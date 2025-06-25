import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import olvidasteContra from "../assets/olvidasteContra.png";
import { useNavigate, useLocation } from "react-router-dom"; // Importar useLocation
import BotonRecu from "../components/recuContra/BotonRecu";
import InputDigito from "../components/recuContra/InputDigito";

const VerificarAccount = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para acceder a los datos de la ruta

  // El backend genera un código de 5 dígitos, así que esto está correcto.
  const [codigo, setCodigo] = useState(Array(5).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputsRef = useRef([]);

  // CORRECCIÓN 4 (Recomendada): Obtener el email para mostrarlo al usuario
  const email = location.state?.email;

  useEffect(() => {
    // Enfocar el primer input al cargar el componente
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    // Permitir solo números y un solo caracter
    if (/^[0-9]$/.test(value) || value === "") {
      const newCodigo = [...codigo];
      newCodigo[index] = value;
      setCodigo(newCodigo);

      if (value && index < 4) {
        focusNext(index);
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !codigo[index] && index > 0) {
      focusPrev(index);
    }
  };

  const focusNext = (index) => {
    inputsRef.current[index + 1]?.focus();
  };

  const focusPrev = (index) => {
    inputsRef.current[index - 1]?.focus();
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
      const response = await fetch(
        
        "http://localhost:4000/api/register/verifyCodeEmail", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
         
          body: JSON.stringify({ verificationCode: verificationCode }),
        
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Código incorrecto o expirado");
      }

      // Si todo va bien → Notifica y navega al login
      alert("¡Cuenta verificada exitosamente!");
      navigate("/login"); // Se recomienda navegar a /login para iniciar sesión

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
            {/* CORRECCIÓN 4 (Recomendada): Mensaje personalizado */}
            Enviamos un código de verificación de 5 dígitos a <strong>{email || "tu correo electrónico"}</strong>. 
            Por favor, ingrésalo a continuación:
          </p>

          {/* Inputs para el código */}
          <div className="flex justify-center md:justify-start gap-3 mb-4">
            {codigo.map((digit, i) => (
              <InputDigito
                key={i}
                index={i}
                value={digit}
                // Simplificamos las props aquí
                onChange={(index, value) => handleChange(index, value)}
                onKeyDown={(e) => handleBackspace(e, i)}
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
          {/* ... El resto de tu JSX que ya está bien ... */}
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