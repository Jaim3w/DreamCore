import React from "react";
import { useNavigate } from "react-router-dom";
// Importación de imágenes para las tarjetas del dashboard
import carrito from "../assets/carropng.png";
import productos from "../assets/productos.png";
import clientes from "../assets/clientes.png";
import ventas from "../assets/ventas.png";
import welcomeImg from "../assets/welcome.png"; // Imagen de bienvenida

const Dashboard = () => {
  const navigate = useNavigate();

  // Definición de las tarjetas que se mostrarán en el dashboard
  const tarjetas = [
    { titulo: "Productos", img: productos, ruta: "/productos" },
    { titulo: "Clientes", img: clientes, ruta: "/clientes" },
    { titulo: "Categorias", img: ventas, ruta: "/categories" },
    { titulo: "pedidos", img: carrito, ruta: "/pedidos" },
  ];

  // Obtener la fecha actual en formato largo en español
  const fechaActual = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#f7fafc] px-4 md:px-8 py-6">
      {/* Header con imagen de bienvenida e información */}
      <div className="bg-gradient-to-r from-[#17604e] to-[#1dbb7b] text-white p-6 md:p-8 rounded-2xl flex items-center justify-between shadow-2xl mb-10 transition-all duration-300">
        <div>
          {/* Fecha actual */}
          <p className="text-xs text-gray-200 mb-1">{fechaActual}</p>
          {/* Título de bienvenida */}
          <h1 className="text-4xl font-extrabold mb-1">¡Bienvenido de vuelta!</h1>
          {/* Subtítulo */}
          <p className="text-md text-gray-100 font-medium">
            ¿Qué deseas hacer hoy?
          </p>
        </div>
        {/* Imagen de bienvenida */}
        <img
          src={welcomeImg}
          alt="Bienvenida"
          className="w-28 md:w-40 h-auto"
        />
      </div>

      {/* Grid de tarjetas de navegación */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {tarjetas.map(({ titulo, img, ruta }) => (
          <div
            key={titulo}
            onClick={() => navigate(ruta)} // Navega a la ruta correspondiente al hacer clic
            className="relative bg-[#1b4d3e] text-white rounded-3xl shadow-xl overflow-hidden p-5 flex flex-col justify-center h-48 min-w-[220px] cursor-pointer transition-transform hover:shadow-2xl hover:scale-105"
          >
            {/* Fondo decorativo con líneas diagonales */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(120deg,#2e7d5c20_0_18px,transparent_18px_36px)] pointer-events-none" />
            <div className="flex flex-col h-full justify-center z-10">
              {/* Título de la tarjeta */}
              <h3 className="text-lg font-bold mb-1">{titulo}</h3>
              {/* Imagen de la tarjeta, tamaño especial para pedidos */}
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