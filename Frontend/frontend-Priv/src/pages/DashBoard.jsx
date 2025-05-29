import React from "react";
import { useNavigate } from "react-router-dom";
import carrito from "../assets/carropng.png";
import productos from "../assets/productos.png";
import clientes from "../assets/clientes.png";
import ventas from "../assets/ventas.png";
import welcomeImg from "../assets/welcome.png";

const Dashboard = () => {
  const navigate = useNavigate();

  const tarjetas = [
    { titulo: "Productos", img: productos, ruta: "/productos" },
    { titulo: "Clientes", img: clientes, ruta: "/clientes" },
    { titulo: "Categorias", img: ventas, ruta: "/categories" },
    { titulo: "pedidos", img: carrito, ruta: "/pedidos" },
  ];

  const fechaActual = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#f7fafc] px-4 md:px-8 py-6">
      {/* Encabezado de bienvenida */}
      <div className="bg-gradient-to-r from-[#17604e] to-[#1dbb7b] text-white p-6 md:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between shadow-2xl mb-10 gap-4">
        <div className="text-center sm:text-left">
          <p className="text-xs text-gray-200 mb-1">{fechaActual}</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-1">
            ¡Bienvenido de vuelta!
          </h1>
          <p className="text-sm sm:text-base text-gray-100 font-medium">
            ¿Qué deseas hacer hoy?
          </p>
        </div>
        <img
          src={welcomeImg}
          alt="Bienvenida"
          className="w-24 sm:w-32 md:w-40 h-auto hidden sm:block"
        />
      </div>

      {/* Tarjetas de navegación */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {tarjetas.map(({ titulo, img, ruta }) => (
          <div
            key={titulo}
            onClick={() => navigate(ruta)}
            className="relative bg-[#1b4d3e] text-white rounded-3xl shadow-xl overflow-hidden p-4 sm:p-5 flex flex-col justify-between h-44 sm:h-48 cursor-pointer transition-transform hover:shadow-2xl hover:scale-[1.03]"
          >
            {/* Fondo decorativo */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(120deg,#2e7d5c20_0_18px,transparent_18px_36px)] pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <h3 className="text-base sm:text-lg font-bold">{titulo}</h3>
              <img
                src={img}
                alt={titulo}
                className={`self-end ${titulo === "pedidos" ? "w-28 sm:w-32 h-auto" : "w-20 sm:w-28 h-auto"}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
