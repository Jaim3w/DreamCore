import React from "react";
import { useNavigate } from "react-router-dom";
import carrito from "../assets/carropng.png";
import productos from "../assets/productos.png";
import clientes from "../assets/clientes.png";
import ventas from "../assets/ventas.png";
import welcomeImg from "../assets/welcome.png"; // Asegúrate de que esta ruta sea correcta

const Dashboard = () => {
  const navigate = useNavigate();

  const tarjetas = [
    { titulo: "Productos", img: productos, ruta: "/productos" },
    { titulo: "Clientes", img: clientes, ruta: "/clientes" },
    { titulo: "Categorias", img: ventas, ruta: "/categories" },
    { titulo: "pedidos", img: carrito, ruta: "/pedidos" },
  ];

  // Obtener fecha actual
  const fechaActual = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#f7fafc] px-4 md:px-8 py-6">
      {/* Header con imagen e información */}
      <div className="bg-gradient-to-r from-[#17604e] to-[#1dbb7b] text-white p-6 md:p-8 rounded-2xl flex items-center justify-between shadow-2xl mb-10 transition-all duration-300">
        <div>
          <p className="text-xs text-gray-200 mb-1">{fechaActual}</p>
          <h1 className="text-4xl font-extrabold mb-1">¡Bienvenido de vuelta!</h1>
          <p className="text-md text-gray-100 font-medium">
            ¿Qué deseas hacer hoy?
          </p>
        </div>
        <img
          src={welcomeImg}
          alt="Bienvenida"
          className="w-28 md:w-40 h-auto"
        />
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {tarjetas.map(({ titulo, img, ruta }) => (
          <div
            key={titulo}
            onClick={() => navigate(ruta)}
            className="relative bg-[#1b4d3e] text-white rounded-3xl shadow-xl overflow-hidden p-5 flex flex-col justify-center h-48 min-w-[220px] cursor-pointer transition-transform hover:shadow-2xl hover:scale-105"
          >
            <div className="absolute inset-0 bg-[repeating-linear-gradient(120deg,#2e7d5c20_0_18px,transparent_18px_36px)] pointer-events-none" />
            <div className="flex flex-col h-full justify-center z-10">
              <h3 className="text-lg font-bold mb-1">{titulo}</h3>
              <img
                src={img}
                alt={titulo}
className={`self-end ${titulo === "pedidos" ? "w-36 h-36" : "w-28 h-28"}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;