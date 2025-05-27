import { useState, useEffect } from 'react';

const useDataCategories = () => {
  const [categories, setCategories] = useState([]);
  
  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error al cargar categorías", error);
    }
  };

  const deleteCategory = async (id) => {
    if (!confirm("¿Deseas eliminar esta categoría?")) return;
    try {
      await fetch(`http://localhost:4000/api/categories/${id}`, {
        method: "DELETE",
      });
      getCategories();
    } catch (error) {
      console.error("Error al eliminar", error);
    }
  };

  const addCategory = async ({ nombre, imagen }) => {
  const formData = new FormData();
  formData.append("categoryName", nombre); // ✅ CAMBIO AQUÍ
  formData.append("image", imagen);

  try {
    await fetch("http://localhost:4000/api/categories", {
      method: "POST",
      body: formData,
    });
    getCategories();
  } catch (error) {
    console.error("Error al agregar categoría", error);
  }
};

const editCategory = async (id, { nombre, imagen }) => {
  const formData = new FormData();
  formData.append("categoryName", nombre); // ✅ CAMBIO AQUÍ
  if (imagen) formData.append("image", imagen);

  try {
    await fetch(`http://localhost:4000/api/categories/${id}`, {
      method: "PUT",
      body: formData,
    });
    getCategories();
    return true;
  } catch (error) {
    console.error("Error al editar categoría", error);
    return false;
  }
};

  useEffect(() => {
    getCategories();
  }, []);

  return { categories, deleteCategory, addCategory, editCategory };
};

export default useDataCategories;