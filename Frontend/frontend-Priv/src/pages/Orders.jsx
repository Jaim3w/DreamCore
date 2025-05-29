// src/pages/OrdersPage.jsx
import React, { useState } from 'react';
import useOrders from '../components/orders/hooks/UseDataOrders';
import OrderList from '../components/orders/OrderList';
import ConfirmationModal from '../components/orders/ConfirmationModal';

// Componente principal para administrar las órdenes/pedidos
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

  if (loading) return <div className="text-center mt-8">Cargando órdenes...</div>;
  if (error) return <div className="text-center text-red-500 mt-8">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-[#f7fafc] px-4 sm:px-6 md:px-8 py-6">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          Administra tus pedidos
        </h2>

        {/* Scroll horizontal en pantallas pequeñas */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left rounded-2xl">
            <thead>
              <tr className="bg-[#1b4d3e] text-white">
                <th className="py-3 px-4 whitespace-nowrap">Cliente</th>
                <th className="py-3 px-4 whitespace-nowrap">Producto</th>
                <th className="py-3 px-4 whitespace-nowrap">Fecha de reserva</th>
                <th className="py-3 px-4 whitespace-nowrap">Cantidad</th>
                <th className="py-3 px-4 whitespace-nowrap">Total</th>
                <th className="py-3 px-4 text-center whitespace-nowrap">Rechazar orden</th>
              </tr>
            </thead>
            <tbody>
              <OrderList orders={orders} onDelete={handleDelete} />
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        message="¿Estás seguro de rechazar este pedido?"
      />
    </div>
  );
};

export default Orders;
