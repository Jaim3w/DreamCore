import CategoryActions from './CategoryActions';

//categoría individual que muestra la imagen, nombre y acciones de editar y eliminar

const CategoryCard = ({ category, onDelete }) => {
  return (
    <div className="flex flex-col items-center bg-white p-4 rounded shadow-md">
      <img
        src={category.image}
        alt={category.name}
        className="h-24 w-24 object-contain mb-2"
      />
    <p className="font-semibold mb-2">Name: {category.categoryName}</p>
      <CategoryActions 
        onEdit={() => console.log("Editar", category)}
        onDelete={() => onDelete(category._id)}
      />
    </div>
  );
};

export default CategoryCard;