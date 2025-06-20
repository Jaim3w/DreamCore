import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import '../components/styles/Products.css';

const categorias = ['todo', 'sillas', 'manteles', 'copas', 'luces', 'mesas'];

const Productos = () => {
  const { categoria } = useParams();
  const categoriaNormalizada = !categoria || categoria === 'todo' ? null : categoria;
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

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
    navigate('/carrito'); // Redirigir al carrito
  };

  return (
    <div className="productos-container">
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
              <img src={prod.productImage} alt={prod.productName} />
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
    </div>
  );
};

export default Productos;
