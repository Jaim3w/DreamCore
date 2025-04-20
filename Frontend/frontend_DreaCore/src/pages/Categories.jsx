import { Link } from "react-router";
import mesas from '../assets/mesas.svg';
import sillas from '../assets/sillas.svg';
import decoraciones from '../assets/decoraciones.svg';
import copas from '../assets/copas.svg';
import manteles from '../assets/manteles.svg';
import luces from '../assets/luces.svg';

const categories = [
  {
    name: "Sillas",
    image: sillas,
    path: "/productos/sillas",
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

const Categories = () => {
  return (
    <div className="eventos-section" style={{ paddingTop: "10px" }}>
    <section className="w-full py-10 bg-white">
      <h2 className="text-3xl font-bold text-center mb-4 text-black">Categorías</h2>
      <div className="w-20 h-1 mx-auto bg-green-800 mb-10"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
        {categories.map((category, index) => (
          <Link
            to={category.path}
            key={index}
            className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          >
            <div className="rounded-lg shadow-md overflow-hidden bg-white cursor-pointer">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
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

export default Categories;
