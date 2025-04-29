import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importamos el hook para navegar
import { auth } from "../firebase/firebaseConfig"; // Importa la configuración de Firebase
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Métodos de autenticación
import backgroundImage from "../assets/fonditobonito.png";
import dreamCoreLogo from "../assets/DreamCore.png";
import eyeOpen from "../assets/eye-open.png";
import eyeClosed from "../assets/eye-closed.png";
import Google from "../assets/Google.png";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleSignIn, setIsGoogleSignIn] = useState(false); // Detecta si el usuario inició sesión con Google

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Usuario autenticado con Google:", user);
      setIsGoogleSignIn(true); // Marca que el usuario inició sesión con Google
      // Aquí puedes redirigir al usuario o guardar su información
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isGoogleSignIn) {
      console.log("Formulario omitido porque el usuario inició sesión con Google.");
      // Aquí puedes redirigir al usuario o realizar otras acciones
    } else {
      console.log("Formulario enviado con los datos ingresados.");
      // Aquí puedes manejar el envío del formulario normalmente
    }
  };

  const navigate = useNavigate(); // Creamos la función navigate 
  const inicioHome= () => {
    navigate("/home"); // Ruta para ir al inico de la app
  };

  const irLogin = () => {
navigate("/login"); // Ruta para ir al login una cuenta

  };

  const forgotPasword = () => {
    navigate("/recoverpassword"); // Ruta para ir a recuperar contraseña
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white/70 backdrop-blur-md rounded-lg shadow-lg p-6 sm:p-8 sm:max-w-md w-full max-w-xs">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-4">
          <img
            className="mx-auto h-40 w-auto"
            src={dreamCoreLogo}
            alt="Your Company"
          />
          <h1 className="text-center text-2xl sm:text-3xl font-bold tracking-tight text-[#1C4C38]">
            Registrate
          </h1>
          <h2 className="mt-6 text-center text-lg sm:text-2xl font-bold tracking-tight text-[#1C4C38]">
            Crea tu nueva cuenta
          </h2>
        </div>
        <div className="mt-8 sm:mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="Name"
                className="block text-sm font-medium text-gray-900"
              >
                Nombre
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="Name"
                  id="Name"
                  autoComplete="name"
                  placeholder="Enter your name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-[#1C4C38] focus:outline-2 focus:outline-indigo-600"
                  required={!isGoogleSignIn} // Solo requerido si no se usa Google
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-[#1C4C38] focus:outline-2 focus:outline-indigo-600"
                  required={!isGoogleSignIn} // Solo requerido si no se usa Google
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-900"
              >
                Fecha de nacimiento
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="date"
                  id="date"
                  required={!isGoogleSignIn} // Solo requerido si no se usa Google
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="cellphone"
                className="block text-sm font-medium text-gray-900"
              >
                Teléfono
              </label>
              <div className="mt-2">
                <input
                  type="tel"
                  name="cellphone"
                  id="cellphone"
                  autoComplete="tel"
                  placeholder="Enter your phone number"
                  pattern="[0-9]"
                  inputMode="numeric"
                  required={!isGoogleSignIn} // Solo requerido si no se usa Google
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-[#1C4C38] focus:outline-2 focus:outline-indigo-600"
                  required={!isGoogleSignIn} // Solo requerido si no se usa Google
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center bg-transparent"
                >
                  <img
                    className="h-6 w-6 object-contain opacity-75 border border-gray-300 rounded shadow-sm"
                    src={showPassword ? eyeOpen : eyeClosed}
                    alt={showPassword ? "Hide password" : "Show password"}
                  />
                </button>
              </div>
            </div>
            <div className="text-center text-sm sm:text-base font-semibold text-gray-900">
              ------ o continuar con ------
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center"
              >
                <img
                  className="h-8 w-8 object-contain"
                  src={Google}
                  alt="Google"
                />
              </button>
            </div>
            <div>
              <button onClick={inicioHome}
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#1C4C38] px-3 py-1.5 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-[#14532D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C4C38]"
              >
                Registrarse
              </button>
            </div>
            <div className="mt-2 text-right">
              <a onClick={forgotPasword}
                href="#"
                className="font-semibold text-[#1C4C38] hover:text-[#1C4C38]"
              >
                Forgot password?
              </a>
            </div>
            <div className="text-center text-sm sm:text-base font-semibold text-gray-900">
              Ya tienes una cuenta?{" "}
              <a onClick={irLogin}
                href="#"
                className="text-[#1C4C38] hover:text-[#1C4C38]"
              >
                Inicia Sesion
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;