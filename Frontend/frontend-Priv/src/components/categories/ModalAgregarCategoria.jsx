import React, { useState } from "react";

const ModalAgregarCategoria = ({ isOpen, onClose, onSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !imagen) return alert("Nombre e imagen son requeridos");
    onSubmit({ nombre, imagen });
    setNombre("");
    setImagen(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#2e7d5c] text-white px-5 py-4 rounded-2xl w-[350px] relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white text-lg hover:text-gray-300"
        >
          ✕
        </button>

        <h2 className="text-center text-lg font-semibold mb-4">
          Agregar categoría
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Campo nombre con mismo estilo que subir imagen */}
          <label className="bg-white text-black rounded-md text-sm px-3 py-1.5">
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </label>

          {/* Campo imagen */}
          <label className="bg-white text-black rounded-md text-sm px-3 py-1.5 flex items-center justify-between cursor-pointer">
            Subir imagen
            <span>📎</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          <button
            type="submit"
            className="bg-[#17604e] hover:bg-[#145f44] text-white py-1.5 rounded-md text-sm"
          >
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalAgregarCategoria;
