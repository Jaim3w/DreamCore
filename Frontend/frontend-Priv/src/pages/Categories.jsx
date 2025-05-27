import { useState } from 'react';
import useCategories from '../components/categories/hooks/useDataCategories';
import ModalAgregarCategoria from "../components/categories/ModalAgregarCategoria";
import ModalEditarCategoria from "../components/categories/ModalEditarCategoria";
import ModalEliminarCategoria from "../components/categories/ModalEliminarCategoria";
import CategoryList from "../components/categories/CategoryList";

const Categories = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const { categories, deleteCategory, addCategory, editCategory } = useCategories();

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteCategory(selectedCategory._id);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-6">
      {/* Botón para agregar y modal de agregar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Ingresa Categorías:</h2>
        <button
          className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => setIsAddModalOpen(true)}
        >
          Agregar categorías
        </button>
      </div>

      <ModalAgregarCategoria
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={addCategory}
      />

      <ModalEditarCategoria
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={(data) => editCategory(selectedCategory._id, data)}
        categoria={selectedCategory}
      />

      <ModalEliminarCategoria
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        categoria={selectedCategory}
      />

      <CategoryList 
        categories={categories} 
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}  
      />
    </div>
  );
};

export default Categories;