// Importa React y hooks necesarios
import React, { useEffect, useState } from 'react';
// useParams permite acceder al parámetro de la URL (ej: /productos/sillas)
import { useParams, Link } from 'react-router';
// Icono del carrito de compras
import { FaShoppingCart } from 'react-icons/fa';
// Estilos específicos del componente
import '../components/Products.css';

// Objeto de ejemplo con productos de distintas categorías
const productosDemo = {
  sillas: [
    {
      id: 1,
      nombre: 'Silla Tiffany',
      precio: 7,
      imagen: 'https://ae01.alicdn.com/kf/S0007117232254a79a33f1031c7522708K.jpg',
    },
  ],
  manteles: [
    {
      id: 2,
      nombre: 'Mantel Blanco',
      precio: 3.5,
      imagen: 'https://i.ebayimg.com/thumbs/images/g/CJkAAOSwheRnnjP2/s-l1200.jpg',
    },
  ],
};

// Lista de categorías que se mostrarán en la barra lateral
const categorias = ['todo', 'sillas', 'manteles', 'copas', 'luces', 'mesas'];

const Productos = () => {
  // Extrae la categoría desde la URL
  const { categoria } = useParams();
  // Estado local para almacenar los productos a mostrar
  const [productos, setProductos] = useState([]);

  // Hook que se ejecuta cuando cambia la categoría
  useEffect(() => {
    const fetchProductos = async () => {
      // Si no hay categoría o es "todo", muestra todos los productos disponibles
      if (!categoria || categoria === 'todo') {
        setProductos(Object.values(productosDemo).flat()); // Convierte el objeto en un array plano
      } else {
        // Si hay una categoría específica, muestra solo los productos de esa categoría
        setProductos(productosDemo[categoria] || []); // Usa un array vacío como fallback
      }
    };

    fetchProductos(); // Ejecuta la función para cargar productos
  }, [categoria]); // Se vuelve a ejecutar cada vez que cambia la categoría

  return (
    <div className="productos-container">
      {/* Barra lateral con botones de categoría */}
      <aside className="sidebar-categorias">
        {categorias.map((cat) => {
          // Capitaliza el primer carácter del nombre de la categoría
          const display = cat.charAt(0).toUpperCase() + cat.slice(1);
          return (
            <Link
              key={cat}
              to={`/productos/${cat}`}
              // Clase "activa" si la categoría actual coincide o si no hay categoría y es "todo"
              className={`categoria-btn ${categoria === cat || (!categoria && cat === 'todo') ? 'activa' : ''}`}
            >
              {display}
            </Link>
          );
        })}
      </aside>

      {/* Grid con los productos filtrados por categoría */}
      <section className="productos-grid">
        {productos.map((prod) => (
          <article key={prod.id} className="producto-card">
            {/* Imagen del producto */}
            <div className="producto-imagen">
              <img src={prod.imagen} alt={prod.nombre} />
            </div>
            {/* Información del producto */}
            <div className="producto-info">
              <h3>{prod.nombre}</h3>
              <div className="producto-precio-cart">
                <span className="precio">${prod.precio}</span>
                {/* Botón del carrito (aún no funcional) */}
                <button className="btn-carrito">
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Productos;
