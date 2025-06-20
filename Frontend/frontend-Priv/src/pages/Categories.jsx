import { useState } from 'react';
import useCategories from '../components/categories/hooks/useDataCategories';
import ModalAgregarCategoria from "../components/categories/ModalAgregarCategoria";
import ModalEditarCategoria from "../components/categories/ModalEditarCategoria";
import ModalEliminarCategoria from "../components/categories/ModalEliminarCategoria";
import CategoryList from "../components/categories/CategoryList";
import BotonGenerico from '../components/BotonGenerico';

// El componente Categories maneja la lógica de las categorías, incluyendo agregar, editar y eliminar categorías.
const Categories = () => {
  // Estados para controlar la visibilidad de los modales
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // Estado para guardar la categoría seleccionada (para editar o eliminar)
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Hook personalizado para manejar las categorías y sus acciones
  const { categories, deleteCategory, addCategory, editCategory } = useCategories();

  // Abre el modal de edición y guarda la categoría seleccionada
  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  // Abre el modal de eliminación y guarda la categoría seleccionada
  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  // Confirma la eliminación de la categoría seleccionada
  const handleConfirmDelete = () => {
    deleteCategory(selectedCategory._id);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-6">
      {/* Encabezado y botón para agregar categoría */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl sm:text-2xl">Ingresa Categorías:</h2>
        <BotonGenerico
        label="Agregar categorías"
          className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => setIsAddModalOpen(true)}
        />
        
      </div>

      {/* Modal para agregar categoría */}
      <ModalAgregarCategoria
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={addCategory}
      />

      {/* Modal para editar categoría */}
      <ModalEditarCategoria
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={(data) => editCategory(selectedCategory._id, data)}
        categoria={selectedCategory}
      />

      {/* Modal para eliminar categoría */}
      <ModalEliminarCategoria
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        category={selectedCategory} 
      />

      {/* Lista de categorías con acciones de editar y eliminar */}
      <CategoryList 
        categories={categories} 
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}  
      />
    </div>
  );
};

export default Categories;