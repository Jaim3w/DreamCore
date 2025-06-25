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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    birthDate: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const registerClient = async (clientData) => {
    const response = await fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
       credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al registrar el cliente");
    }

    const data = await response.json();
    navigate("/verificar");
    return data;
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const displayName = user.displayName || "";
      const nameParts = displayName.trim().split(" ").filter(Boolean);

      const googleClientData = {
        name: nameParts[0] || "GoogleUser",
        lastName: nameParts.slice(1).join(" ") || "Account",
        email: user.email || `${Date.now()}@googleuser.com`,
        birthDate: new Date().toISOString().split("T")[0],
        phone: user.phoneNumber || "00000000",
        password: `google_auth_${Date.now()}`,
      };

      await registerClient(googleClientData);
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      setError(error.message || "Error al registrarse con Google");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { name, lastName, email, birthDate, phone, password } = formData;
      if (!name || !lastName || !email || !birthDate || !phone || !password) {
        throw new Error("Todos los campos son obligatorios");
      }
      await registerClient(formData);
    } catch (error) {
      console.error("Error al registrar cliente:", error);
      setError(error.message || "Error al crear la cuenta");
    } finally {
      setLoading(false);
    }
  };

  const irLogin = () => navigate("/login");
  const forgotPassword = () => navigate("/recoverpassword");

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center bg-cover bg-center p-2 sm:p-0 overflow-y-auto"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white/70 backdrop-blur-md rounded-lg shadow-lg p-3 sm:p-6 w-[98vw] max-w-[600px] mx-auto my-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-40 w-auto" src={dreamCoreLogo} alt="DreamCore Logo" />
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

        <div className="mt-8 sm:mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 outline-gray-300 placeholder:text-[#1C4C38] focus:outline-2 focus:outline-indigo-600"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">
                  Apellido
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  autoComplete="family-name"
                  placeholder="Tu apellido"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 outline-gray-300 placeholder:text-[#1C4C38] focus:outline-2 focus:outline-indigo-600"
                  required
                  disabled={loading}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  placeholder="tu.correo@ejemplo.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 outline-gray-300 placeholder:text-[#1C4C38] focus:outline-2 focus:outline-indigo-600"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-900">
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  name="birthDate"
                  id="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  autoComplete="tel"
                  placeholder="12345678"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                  required
                  disabled={loading}
                />
              </div>

              <div className="md:col-span-2 relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  placeholder="Tu contraseña"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 outline-gray-300 placeholder:text-[#1C4C38] focus:outline-2 focus:outline-indigo-600"
                  required
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

            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="flex items-center justify-center disabled:opacity-50"
              >
                <img className="h-8 w-8 object-contain" src={Google} alt="Google" />
              </button>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-[#1C4C38] px-3 py-1.5 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-[#14532D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C4C38] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Registrando..." : "Registrarse"}
              </button>
            </div>

            <div className="mt-2 text-right">
              <a
                onClick={forgotPassword}
                href="#"
                className="font-semibold text-[#1C4C38] hover:text-[#1C4C38]"
              >
                Forgot password?
              </a>
            </div>

            <div className="text-center text-sm sm:text-base font-semibold text-gray-900">
              Ya tienes una cuenta?{" "}
              <a
                onClick={irLogin}
                href="#"
                className="text-[#1C4C38] hover:text-[#1C4C38]"
              >
                Inicia Sesión
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
