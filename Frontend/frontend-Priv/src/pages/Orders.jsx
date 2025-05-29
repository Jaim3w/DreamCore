// src/pages/OrdersPage.jsx
import React, { useState } from 'react';
import useOrders from '../components/orders/hooks/UseDataOrders';
import OrderList from '../components/orders/OrderList';
import ConfirmationModal from '../components/orders/ConfirmationModal';

// Componente principal para administrar las órdenes/pedidos
const Orders = () => {
  // Hook personalizado para obtener las órdenes y funciones relacionadas
  const { orders, loading, error, deleteOrder } = useOrders();

  // Estado para controlar la visibilidad del modal de confirmación
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Estado para guardar la orden seleccionada para eliminar
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Función que se llama al hacer clic en eliminar, abre el modal y guarda la orden seleccionada
  const handleDelete = (orderId) => {
    setSelectedOrder(orderId);
    setIsModalOpen(true);
  };

  // Función que se llama al confirmar la eliminación en el modal
  const confirmDelete = async () => {
    await deleteOrder(selectedOrder);
    setIsModalOpen(false);
  };

  // Muestra mensaje de carga si está cargando
  if (loading) return <div>Loading orders...</div>;
  // Muestra mensaje de error si hay un error
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-[#f7fafc] px-4 md:px-8 py-6">
      {/* Contenedor principal de la tabla */}
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
            {/* Renderiza la lista de órdenes */}
            <OrderList orders={orders} onDelete={handleDelete} />
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación para eliminar una orden */}
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