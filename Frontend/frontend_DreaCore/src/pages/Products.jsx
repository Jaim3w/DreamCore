// Productos.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { FaShoppingCart } from 'react-icons/fa';
import '../components/Products.css';

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

const categorias = ['todo', 'sillas', 'manteles', 'copas', 'luces', 'mesas'];

const Productos = () => {
  const { categoria } = useParams();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {

      if (!categoria || categoria === 'todo') {
        setProductos(Object.values(productosDemo).flat());
      } else {
        setProductos(productosDemo[categoria] || []);
      }
    };

    fetchProductos();
  }, [categoria]);

  return (
    <div className="productos-container">
      <aside className="sidebar-categorias">
        {categorias.map((cat) => {
          const display = cat.charAt(0).toUpperCase() + cat.slice(1);
          return (
            <Link
              key={cat}
              to={`/productos/${cat}`}
              className={`categoria-btn ${categoria === cat || (!categoria && cat === 'todo') ? 'activa' : ''}`}>
              {display}
            </Link>
          );
        })}
      </aside>

      <section className="productos-grid">
        {productos.map((prod) => (
          <article key={prod.id} className="producto-card">
            <div className="producto-imagen">
              <img src={prod.imagen} alt={prod.nombre} />
            </div>
            <div className="producto-info">
              <h3>{prod.nombre}</h3>
              <div className="producto-precio-cart">
                <span className="precio">${prod.precio}</span>
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
