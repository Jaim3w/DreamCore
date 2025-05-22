import React from "react";
import carrito from "../assets/carropng.png";
import productos from "../assets/productos.png";
import clientes from "../assets/clientes.png";
import ventas from "../assets/ventas.png";

const Dashboard = () => {
  const tarjetas = [
    { titulo: "Productos", img: productos },
    { titulo: "Clientes", img: clientes },
    { titulo: "Ventas", img: ventas },
    { titulo: "carrito", img: carrito },
  ];

return (
    <div className="min-h-screen bg-[#f7fafc] px-4 md:px-8 py-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#17604e] to-[#1dbb7b] text-white p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between shadow-2xl mb-10 transition-all duration-300">
        <div className="text-center md:text-left">
          <p className="text-xs text-gray-200 mb-2">21 de mayo, 2025</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-1 drop-shadow-lg">
            ¡Bienvenido de vuelta!
          </h1>
          <p className="text-md md:text-lg text-gray-100 font-medium">
            ¿Qué deseas hacer hoy?
          </p>
        </div>
        <div className="mt-6 md:mt-0 w-28 md:w-36">
          {/* Puedes cambiar el SVG por una imagen si lo deseas */}
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <circle cx="32" cy="32" r="32" fill="#F0FDF4" />
            <path
              d="M32 12c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zM20 45c0-6 5-11 12-11s12 5 12 11v3H20v-3z"
              fill="#34D399"
            />
            <rect x="22" y="35" width="20" height="2" fill="#065F46" />
            <path d="M28 40h8v2h-8z" fill="#065F46" />
            <circle cx="32" cy="21" r="3" fill="#065F46" />
          </svg>
        </div>
      </div>

      {/* Tarjetas con líneas de fondo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {tarjetas.map(({ titulo, img }) => (
          <div
            key={titulo}
            className="relative bg-[#1b4d3e] text-white rounded-3xl shadow-xl overflow-hidden p-5 flex flex-col justify-center h-48 min-w-[220px] cursor-pointer transition-transform hover:shadow-2xl hover:scale-105"
          >
            <div className="absolute inset-0 bg-[repeating-linear-gradient(120deg,#2e7d5c20_0_18px,transparent_18px_36px)] pointer-events-none" />
            <div className="flex flex-col h-full justify-center z-10">
              <h3 className="text-lg font-bold mb-1">{titulo}</h3>
              <img
                src={img}
                alt={titulo}
                className={`self-end ${titulo === "carrito" ? "w-50 h-50" : "w-28 h-28"}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Dashboard;