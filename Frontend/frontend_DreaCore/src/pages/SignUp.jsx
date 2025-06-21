import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import backgroundImage from "../assets/fonditobonito.png";
import dreamCoreLogo from "../assets/DreamCore.png";
import eyeOpen from "../assets/eye-open.png";
import eyeClosed from "../assets/eye-closed.png";
import Google from "../assets/Google.png";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    birthDate: '',
    phone: '',
    password: ''
  });

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const createClient = async (clientData) => {
    try {
      const response = await fetch('http://localhost:4000/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el cliente');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating client:', error);
      throw error;
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Usuario autenticado con Google:", user);

      // Crear cliente con datos de Google
      const displayName = user.displayName || '';
      const nameParts = displayName.split(' ');
      const googleClientData = {
        name: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: user.email || '',
        birthDate: new Date().toISOString().split('T')[0], // Fecha por defecto
        phone: user.phoneNumber || '00000000', // Teléfono por defecto
        password: 'google_auth' // Placeholder para Google Sign-In
      };

      const newClient = await createClient(googleClientData);
      console.log("Cliente creado con Google:", newClient);
      
      setIsGoogleSignIn(true);
      navigate("/home");
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      setError(error.message || "Error al registrarse con Google");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isGoogleSignIn) {
      console.log("Formulario omitido porque el usuario inició sesión con Google.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (!formData.name || !formData.lastName || !formData.email || !formData.birthDate || !formData.phone || !formData.password) {
        throw new Error("Todos los campos son obligatorios");
      }

      const clientData = {
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email,
        birthDate: formData.birthDate,
        phone: formData.phone,
        password: formData.password
      };

      const newClient = await createClient(clientData);
      console.log("Cliente creado exitosamente:", newClient);
      navigate("/home");
    } catch (error) {
      console.error("Error al registrar cliente:", error);
      setError(error.message || "Error al crear la cuenta");
    } finally {
      setLoading(false);
    }
  };

  const inicioHome = () => {
    navigate("/home");
  };

  const irLogin = () => {
    navigate("/login");
  };

  const forgotPassword = () => {
    navigate("/recoverpassword");
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center p-2 sm:p-0"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
     <div className="bg-white/70 backdrop-blur-md rounded-lg shadow-lg p-3 sm:p-6 w-[98vw] max-w-[370px] mx-auto">
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

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mt-8 sm:mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-900"
              >
                Apellido
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  autoComplete="family-name"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-[#1C4C38] focus:outline-2 focus:outline-indigo-600"
                  required={!isGoogleSignIn}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900"
              >
                Nombre
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-[#1C4C38] focus:outline-2 focus:outline-indigo-600"
                  required={!isGoogleSignIn}
                  disabled={loading}
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
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-[#1C4C38] focus:outline-2 focus:outline-indigo-600"
                  required={!isGoogleSignIn}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="birthDate"
                className="block text-sm font-medium text-gray-900"
              >
                Fecha de nacimiento
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="birthDate"
                  id="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  required={!isGoogleSignIn}
                  disabled={loading}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-900"
              >
                Teléfono
              </label>
              <div className="mt-2">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  autoComplete="tel"
                  placeholder="Enter your phone number"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required={!isGoogleSignIn}
                  disabled={loading}
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
                  autoComplete="new-password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-[#1C4C38] focus:outline-2 focus:outline-indigo-600"
                  required={!isGoogleSignIn}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center bg-transparent"
                  disabled={loading}
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
                disabled={loading}
                className="flex items-center justify-center disabled:opacity-50"
              >
                <img
                  className="h-8 w-8 object-contain"
                  src={Google}
                  alt="Google"
                />
              </button>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-[#1C4C38] px-3 py-1.5 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-[#14532D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C4C38] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Registrando...' : 'Registrarse'}
              </button>
            </div>

            <div className="mt-2 text-right">
              <a onClick={forgotPassword}
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