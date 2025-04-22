// Importa el componente Link desde react-router para la navegación entre rutas
import { Link } from "react-router";

// Importa las imágenes que se usarán como íconos para las categorías
import mesas from '../assets/mesas.svg';
import sillas from '../assets/sillas.svg';
import decoraciones from '../assets/decoraciones.svg';
import copas from '../assets/copas.svg';
import manteles from '../assets/manteles.svg';
import luces from '../assets/luces.svg';

// Arreglo de objetos que representan las diferentes categorías de productos
const categories = [
  {
    name: "Sillas",         // Nombre de la categoría
    image: sillas,          // Imagen asociada
    path: "/productos/sillas", // Ruta a la que dirige el enlace
  },
  {
    name: "Mesas",
    image: mesas,
    path: "/productos/mesas",
  },
  {
    name: "Decoraciones",
    image: decoraciones,
    path: "/productos/decoraciones",
  },
  {
    name: "Copas",
    image: copas,
    path: "/productos/copas",
  },
  {
    name: "Manteles",
    image: manteles,
    path: "/productos/manteles",
  },
  {
    name: "Luces",
    image: luces,
    path: "/productos/luces",
  },
];

// Componente principal que renderiza la sección de categorías
const Categories = () => {
  return (
    // Contenedor principal con algo de padding superior
    <div className="eventos-section" style={{ paddingTop: "10px" }}>
      {/* Sección estilizada con padding y fondo blanco */}
      <section className="w-full py-10 bg-white">
        {/* Título centrado */}
        <h2 className="text-3xl font-bold text-center mb-4 text-black">Categorías</h2>

        {/* Línea decorativa debajo del título */}
        <div className="w-20 h-1 mx-auto bg-green-800 mb-10"></div>

        {/* Contenedor en grid para mostrar las categorías de forma responsiva */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
          {/* Itera sobre cada categoría y crea un enlace hacia su ruta correspondiente */}
          {categories.map((category, index) => (
            <Link
              to={category.path}
              key={index}
              className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            >
              {/* Tarjeta individual para cada categoría */}
              <div className="rounded-lg shadow-md overflow-hidden bg-white cursor-pointer">
                {/* Imagen de la categoría */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover"
                />
                {/* Nombre de la categoría en un fondo verde */}
                <div className="bg-green-900 text-white text-center py-2 text-lg font-medium">
                  {category.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

// Exporta el componente para que pueda ser utilizado en otras partes de la app
export default Categories;