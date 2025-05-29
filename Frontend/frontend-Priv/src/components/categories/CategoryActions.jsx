import lapicito from "../../assets/editar.svg";
import basura from "../../assets/Basura.svg";

//acciones de editar y eliminar para las categorías

const CategoryActions = ({ onEdit, onDelete, category }) => {
  return (
    <div className="flex gap-3">
      <button 
        onClick={() => onEdit(category)} 
        className="hover:opacity-75"
      >
        <img src={lapicito} alt="Editar" className="h-5 w-5" />
      </button>
      <button 
        onClick={() => onDelete(category)} 
        className="hover:opacity-75"
      >
        <img src={basura} alt="Eliminar" className="h-5 w-5" />
      </button>
    </div>
  );
};

export default CategoryActions;