import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Ahora importamos el hook
import backgroundImage from "../assets/fonditobonito.png";
import dreamCoreLogo from "../assets/DreamCore.png";
import eyeOpen from "../assets/eye-open.png";
import eyeClosed from "../assets/eye-closed.png"; // Ícono de ojo cerrado

const Login = () => {
  // Para mostrar u ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Estados para email, password y errores
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Hook para redireccionar
  const { Login } = useAuth(); // Usamos el hook 'useAuth' para obtener la función Login

  // Alterna la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenimos que recargue la página
    const result = await Login(email, password); // Llamamos al login del contexto

    if (result.success) {
      // Si todo salió bien, redireccionamos a /home
      navigate("/dashboard");
    } else {
      // Si hubo un error, lo mostramos
      setError(result.message);
    }
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
          <img className="mx-auto h-40 w-auto" src={dreamCoreLogo} alt="Logo" />
          <h1 className="text-center text-2xl sm:text-3xl font-bold tracking-tight text-[#1C4C38]">
            Welcome Back
          </h1>
          <h2 className="mt-6 text-center text-lg sm:text-2xl font-bold tracking-tight text-[#1C4C38]">
            Inicia sesión en tu cuenta
          </h2>
        </div>

        <div className="mt-8 sm:mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Guardamos lo que el usuario escribe
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-[#1C4C38] focus:outline-2 focus:outline-indigo-600"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-[#1C4C38] focus:outline-2 focus:outline-indigo-600"
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
              <div className="mt-2 text-right">
                <a
                  onClick={() => navigate("/recoverpassword")}
                  href="#"
                  className="font-semibold text-[#1C4C38] hover:text-[#1C4C38]"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#1C4C38] px-3 py-1.5 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-[#14532D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C4C38]"
              >
                Sign in
              </button>
            </div>

            <div className="text-center text-sm sm:text-base font-semibold text-gray-900">
              Don't have an account?{" "}
              <a
                onClick={() => navigate("/signup")}
                href="#"
                className="text-[#1C4C38] hover:text-[#1C4C38]"
              >
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
