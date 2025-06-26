import ordersModel from "../models/orders.js";
import productModel from "../models/products.js"; // Asegúrate de importar el modelo de productos

const ordersControllers = {};

// GET all orders
ordersControllers.getOrders = async (req, res) => {
  try {
    const orders = await ordersModel.find()
      .populate('idClient', 'name') // Solo nombre del cliente
      .populate('products.idProduct', 'productName'); // Solo nombre del producto

    // Transformamos la respuesta para incluir productName directo
    const transformedOrders = orders.map(order => {
      const orderObj = order.toObject();
      return {
        ...orderObj,
        products: orderObj.products.map(product => ({
          ...product,
          productName: product.idProduct?.productName || 'Producto sin nombre'
        }))
      };
    });

    res.status(200).json(transformedOrders);
  } catch (error) {
    console.error('Error en getOrders:', error);
    res.status(500).json({
      message: "Error al obtener las órdenes",
      error: error.message
    });
  }
};

// GET single order
ordersControllers.getOrder = async (req, res) => {
  try {
    const order = await ordersModel.findById(req.params.id)
      .populate('products.idProduct', 'productName') // <-- corregido aquí
      .populate('idClient', 'name');

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const orderObj = order.toObject();
    const transformedOrder = {
      ...orderObj,
      products: orderObj.products.map(product => ({
        ...product,
        productName: product.idProduct?.productName || 'Nombre no disponible',
        idProduct: product.idProduct?._id || product.idProduct
      }))
    };

    res.status(200).json(transformedOrder);
  } catch (error) {
    console.error("Error en getOrder:", error);
    res.status(500).json({ 
      message: "Error fetching the order", 
      error: error.message 
    });
  }
};

// CREATE order
ordersControllers.createOrders = async (req, res) => {
  try {
    const { idClient, products, reservationDate, quantity, total } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Debes incluir productos." });
    }

    const newOrder = new ordersModel({
      idClient,
      products,
      reservationDate,
      quantity,
      total,
    });

    await newOrder.save();
res.status(201).json({ message: "Order created", orderId: newOrder._id });
  } catch (error) {
    console.error("Error en getOrder:", error);
res.status(500).json({ 
  message: "Error fetching the order", 
  error: error.message 
});
  }
};

// DELETE order
ordersControllers.deleteOrders = async (req, res) => {
  try {
    const deletedOrder = await ordersModel.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    res.json({ message: "Order deleted" });
  } catch (error) {
    console.error("Error en deleteOrders:", error);
    res.status(500).json({ message: "Error al eliminar la orden", error: error.message });
  }
};

// UPDATE order
ordersControllers.updateOrders = async (req, res) => {
  try {
    const { idClient, products, reservationDate, quantity, total } = req.body;

    const updatedOrder = await ordersModel.findByIdAndUpdate(
      req.params.id,
      {
        idClient,
        products,
        reservationDate,
        quantity,
        total
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Orden no encontrada para actualizar" });
    }

    res.json({ message: "Order updated" });
  } catch (error) {
    console.error("Error en updateOrders:", error);
    res.status(500).json({ message: "Error al actualizar la orden", error: error.message });
  }
};

// GET orders by client ID
ordersControllers.getOrdersByClient = async (req, res) => {
  const { clientId } = req.params;

  try {
    const orders = await ordersModel.find({ idClient: clientId })
      .populate("products.idProduct", "productName");

    const transformed = orders.map((order) => {
      const orderObj = order.toObject();
      return {
        ...orderObj,
        products: orderObj.products.map((p) => ({
          ...p,
          productName: p.idProduct?.productName || "Sin nombre"
        }))
      };
    });

    res.status(200).json(transformed);
  } catch (error) {
    console.error("Error en getOrdersByClient:", error);
    res.status(500).json({
      message: "Error al obtener el historial del cliente",
      error: error.message,
    });
  }
};


export default ordersControllers;
