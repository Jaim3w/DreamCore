// Productos.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import ShoppingCart from './ShoppingCart';

import '../components/styles/Products.css';

const categorias = ['todo', 'sillas', 'manteles', 'copas', 'luces', 'mesas'];

const Productos = ({ setMostrarHeader }) => {
  const { categoria } = useParams();
  const categoriaNormalizada = !categoria || categoria === 'todo' ? null : categoria;
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      setError(null);
      setProductos([]);

      try {
        let url = 'http://localhost:4000/api/products';
        if (categoriaNormalizada) {
          url = `http://localhost:4000/api/products/by-category/${categoriaNormalizada}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('No se pudieron cargar los productos');
        }

        const data = await response.json();
        setProductos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [categoriaNormalizada]);

const handleAddToCart = (producto) => {
  addToCart(producto);
  setMostrarCarrito(true);
  setMostrarHeader(false); // Oculta el Header
  document.body.style.overflow = 'hidden';
};

const handleCloseCart = () => {
  setMostrarCarrito(false);
  setMostrarHeader(true); // Muestra el Header nuevamente
  document.body.style.overflow = 'auto';
};

  return (
    <div className="productos-container relative z-0">
      <aside className="sidebar-categorias">
        {categorias.map((cat) => {
          const display = cat.charAt(0).toUpperCase() + cat.slice(1);
          const linkTo = cat === 'todo' ? '/productos' : `/productos/${cat}`;
          return (
            <Link
              key={cat}
              to={linkTo}
              className={`categoria-btn ${categoria === cat || (!categoria && cat === 'todo') ? 'activa' : ''}`}
            >
              {display}
            </Link>
          );
        })}
      </aside>

      <section className="productos-grid">
        {loading && <p>Cargando productos...</p>}
        {error && <p>Error al cargar los productos: {error}</p>}
        {productos.map((prod) => (
          <article key={prod._id} className="producto-card">
            <div className="producto-imagen">
              <Link to={`/producto/${prod._id}`}>
               <img src={prod.productImage} alt={prod.productName} />
              </Link>
            </div>
            <div className="producto-info">
              <h3>{prod.productName}</h3>
              <div className="producto-precio-cart">
                <span className="precio">${prod.price}</span>
                <button className="btn-carrito" onClick={() => handleAddToCart(prod)}>
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {mostrarCarrito && (
        <div className="fixed inset-0 z-50">
          <ShoppingCart onClose={handleCloseCart} />
        </div>
      )}
    </div>
  );
};

export default Productos;
