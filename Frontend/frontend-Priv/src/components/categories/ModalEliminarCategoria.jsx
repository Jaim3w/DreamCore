import React, { useState } from "react";

const ModalEliminarCategoria = ({ isOpen, onClose, onSubmit, categoria }) => {
  const [nombre, setNombre] = useState(categoria?.nombre || "");
  const [imagen, setImagen] = useState(null);

  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre) return alert("El nombre es requerido");
    onSubmit({ ...categoria, nombre, imagen });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#2e7d5c] text-white p-6 rounded-2xl w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white font-bold text-xl"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">
Eliminar Categoria        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Estilo similar al de subir imagen */}
          <label className="bg-white text-black rounded-md px-3 py-2 text-sm">
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </label>
          <button
            type="submit"
            className="bg-[#bd1616] hover:bg-[#104b38] text-white py-2 rounded-md text-sm"
          >
            Eliminnar categoría
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalEliminarCategoria;
