import React from "react";
import backgroundImage from "../../assets/imagenlogin2.jpg";

function Login() {
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
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
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
          <form className="space-y-6" action="#" method="POST">
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
                  required
                  placeholder="Enter your email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-[#1C4C38] focus:outline-2 focus:outline-indigo-600"
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
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-[#1C4C38] focus:outline-2 focus:outline-indigo-600"
                />
              </div>
              <div className="mt-2 text-right">
                <a
                  href="#"
                  className="font-semibold text-[#1C4C38] hover:text-[#1C4C38]"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#1C4C38] px-3 py-1.5 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-[#14532D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C4C38]"
              >
                Sign in
              </button>
            </div>
            <div className="text-center text-sm sm:text-base font-semibold text-gray-900">
              Don't have an account?{" "}
              <a
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
}

export default Login;