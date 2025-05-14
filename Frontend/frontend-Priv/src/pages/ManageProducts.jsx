import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";

function Products() {
  return (
    <div>
      <Header />
      <div className="p-6">
        <h2 className="font-bold text-lg mb-4 " >Ingresa los Productos:</h2>
      </div>
      <div className="flex items-center justify-end mb-4 gap-8">
        <button className="bg-[#1D4635] text-white px-8 py- rounded hover:bg-[#163828] transition">
          Agrega Productos
        </button>
        <div className="flex items-center border rounded px-2 py-1">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none border-none bg-transparent"
          />
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4-4m0 0A7 7 0 104 4a7 7 0 0013 13z"
            />
          </svg>
        </div>
      </div>
      <div >
    <table className="min-w-full bg-whiter border border-gray-100">
    <thead>
      <tr>
        <th>Name</th>
        <th>Descripcion</th>
        <th>Precio</th>
        <th>Stock</th>
        <th>Categorias</th>
        <th className="text-transparent">Comandos</th>
      </tr>
    </thead>
    </table>
      </div>
    </div>
  );
}

export default Products;