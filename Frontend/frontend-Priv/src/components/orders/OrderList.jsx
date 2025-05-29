import React from 'react';
import OrderActions from "./OrdersActions";

// Componente que muestra la lista de órdenes en filas de tabla
const OrderList = ({ orders, onDelete }) => {
  // Si no hay órdenes, muestra un mensaje en una fila
  if (orders.length === 0) {
    return (
      <tr>
        <td colSpan={6} className="text-center py-8 text-gray-400">
          No tienes ordenes actualmente     
        </td>
      </tr>
    );
  }

  // Mapea cada orden a una fila de la tabla
  return orders.map((order) => (
    <tr key={order._id} className="border-b last:border-b-0 hover:bg-[#e6f4ef]">
      {/* Nombre del cliente (usando populate en backend) */}
      <td className="py-3 px-4">
        {order.idClient?.name || 'Sin cliente'}
      </td>
      {/* Nombres de los productos (usando populate en backend) */}
      <td className="py-3 px-4">
        {order.products && order.products.length > 0
          ? order.products.map(p => p.idProduct?.productName || 'Sin nombre').join(', ')
          : 'Sin producto'}
      </td>
      {/* Fecha de reservación formateada */}
      <td className="py-3 px-4">
        {order.reservationDate
          ? new Date(order.reservationDate).toLocaleDateString('es-ES')
          : 'Sin fecha'}
      </td>
      {/* Cantidad total de productos */}
      <td className="py-3 px-4">{order.quantity}</td>
      {/* Total de la orden, formateado a dos decimales */}
      <td className="py-3 px-4">${order.total?.toFixed(2) || 0}</td>
      {/* Botón de acción para eliminar la orden */}
      <td className="py-3 px-4 flex justify-center">
        <OrderActions onDelete={() => onDelete(order._id)} />
      </td>
    </tr>
  ));
};

export default OrderList;