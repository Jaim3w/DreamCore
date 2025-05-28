// src/pages/OrdersPage.jsx
import React, { useState } from 'react';
import useOrders from '../components/orders/hooks/UseDataOrders';
import OrderList from '../components/orders/OrderList';
import ConfirmationModal from '../components/orders/ConfirmationModal';

const Orders = () => {
  const { orders, loading, error, deleteOrder } = useOrders();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleDelete = (orderId) => {
    setSelectedOrder(orderId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    await deleteOrder(selectedOrder);
    setIsModalOpen(false);
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-[#f7fafc] px-4 md:px-8 py-6">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6">Administra tus pedidos</h2>
        <table className="w-full text-left rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-[#1b4d3e] text-white">
              <th className="py-3 px-4">Cliente</th>
              <th className="py-3 px-4">Producto</th>
              <th className="py-3 px-4">Fecha de reserva</th>
              <th className="py-3 px-4">cantidad</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4 text-center">Rehazar orden</th>
            </tr>
          </thead>
          <tbody>
            <OrderList orders={orders} onDelete={handleDelete} />
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        message="Estas seguro de Rechazar ese pedido"
      />
    </div>
  );
};

export default Orders;