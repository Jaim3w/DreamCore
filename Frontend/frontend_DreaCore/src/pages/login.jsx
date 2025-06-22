import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/fonditobonito.png";
import dreamCoreLogo from "../assets/DreamCore.png";
import eyeOpen from "../assets/eye-open.png";
import eyeClosed from "../assets/eye-closed.png";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      // Si el login es exitoso, guardar el token
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        // Guardamos la información básica del usuario basada en el email
        localStorage.setItem('userData', JSON.stringify({
          email: email,
          loginTime: new Date().toISOString()
        }));
      }

      // Redirigir al home
      navigate("/");
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const irsingup = () => {
    navigate("/signup");
  };

  const forgotPassword = () => {
    navigate("/recoverpassword");
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
      {/* Card */}
      <div className="bg-white/70 backdrop-blur-md rounded-lg shadow-lg p-6 sm:p-8 sm:max-w-md w-full max-w-xs">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-4">
          <img
            className="mx-auto h-40 w-auto"
            src={dreamCoreLogo}
            alt="Your Company"
          />
          <h1 className="text-center text-2xl sm:text-3xl font-bold tracking-tight text-[#1C4C38]">
            Welcome Back
          </h1>
          <h2 className="mt-6 text-center text-lg sm:text-2xl font-bold tracking-tight text-[#1C4C38]">
            Inicia sesión en tu cuenta
          </h2>
        </div>
        <div className="mt-8 sm:mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  placeholder="Enter your email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-[#1C4C38] focus:outline-2 focus:outline-indigo-600"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
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
                  onClick={forgotPassword}
                  href="#"
                  className="font-semibold text-[#1C4C38] hover:text-[#1C4C38] cursor-pointer"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-[#1C4C38] px-3 py-1.5 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-[#14532D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C4C38] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
            
            <div className="text-center text-sm sm:text-base font-semibold text-gray-900">
              Don't have an account?{" "}
              <a 
                onClick={irsingup}
                href="#"
                className="text-[#1C4C38] hover:text-[#1C4C38] cursor-pointer"
              >
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;