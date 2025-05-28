import React from 'react';
import CategoryActions from './CategoryActions'; // Importa el componente

const CategoryList = ({ categories, onEdit, onDelete }) => {
  return (
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
          <p className="font-semibold mb-2">Name: {category.categoryName}</p>
          
          {/* Usa el componente importado */}
          <CategoryActions 
            onEdit={() => onEdit(category)}
            onDelete={() => onDelete(category)}
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryList;