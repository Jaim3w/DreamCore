import React, { useEffect, useState } from "react";
import lapicito from "../assets/editar.svg";
import basura from "../assets/Basura.svg";
import ModalAgregarCategoria from "./ModalAgregarCategoria"; // importa el modal
import ModalEditarCategoria from "./ModalEditarCategoria";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error al cargar categorías", error);
    }
  };

  const deleteCategory = async (id) => {
    if (!confirm("¿Deseas eliminar esta categoría?")) return;
    try {
      await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: "DELETE",
      });
      getCategories();
    } catch (error) {
      console.error("Error al eliminar", error);
    }
  };

  const addCategory = async ({ nombre, imagen }) => {
    const formData = new FormData();
    formData.append("name", nombre);
    formData.append("image", imagen);

    try {
      await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        body: formData,
      });
      getCategories();
    } catch (error) {
      console.error("Error al agregar categoría", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Ingresa Categorías:</h2>
        <button
          className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => setIsModalOpen(true)}
        >
          Agregar categorías
        </button>
      </div>

      <ModalAgregarCategoria
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addCategory}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category._id}
            className="flex flex-col items-center bg-white p-4 rounded shadow-md"
          >
            <img
              src={category.image}
              alt={category.name}
              className="h-24 w-24 object-contain mb-2"
            />
            <p className="font-semibold mb-2">Name: {category.name}</p>
            <div className="flex gap-3">
              <button
                onClick={() => console.log("Editar", category)}
                className="hover:opacity-75"
              >
                <img src={lapicito} alt="Editar" className="h-5 w-5" />
              </button>
              <button
                onClick={() => deleteCategory(category._id)}
                className="hover:opacity-75"
              >
                <img src={basura} alt="Eliminar" className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
