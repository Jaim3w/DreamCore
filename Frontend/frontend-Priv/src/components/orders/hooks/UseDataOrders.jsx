// src/hooks/useOrders.js
import { useState, useEffect } from 'react';

const UseDataOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/orders");
      if (!res.ok) throw new Error('Failed to load orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/orders/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete order');
      fetchOrders(); // Refresh list after deletion
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, loading, error, deleteOrder };
};

export default UseDataOrders;