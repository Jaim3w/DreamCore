import ordersModel from "../models/orders.js";
import productModel from "../models/products.js"; // Asegúrate de importar el modelo de productos

const ordersControllers = {};

// GET all orders (versión optimizada)
ordersControllers.getOrders = async (req, res) => {
  try {
    // Primero obtenemos todas las órdenes sin populate
    const orders = await ordersModel.find().populate('idClient', 'name');
    
    // Obtenemos todos los IDs de productos únicos
   const productIds = [
  ...new Set(
    orders.flatMap(order => order.products.map(p => p.idproduct))
  )
];
    
    // Buscamos los nombres de los productos
    const products = await productModel.find(
      { _id: { $in: productIds } },
      { productName: 1 }
    );
    
    // Creamos un mapa de IDs a nombres
    const productNameMap = products.reduce((map, product) => {
      map[product._id.toString()] = product.productName;
      return map;
    }, {});
    
    // Construimos la respuesta final
    const transformedOrders = orders.map(order => ({
      ...order._doc,
      products: order.products.map(product => ({
        ...product._doc,
        productName: product.idproduct ? 
          (productNameMap[product.idproduct.toString()] || product.productName || 'Producto sin nombre') :
          (product.productName || 'Producto sin nombre'),
        idproduct: product.idproduct
      }))
    }));
    
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
      .populate({
        path: 'products.idproduct',
        select: 'productName -_id',
        model: 'products' // Usamos el nombre del modelo como string
      })
      .populate('idClient', 'name CLIENT');

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const orderObj = order.toObject();
    const transformedOrder = {
      ...orderObj,
      products: orderObj.products.map(product => {
        const productObj = product.toObject ? product.toObject() : product;
        return {
          ...productObj,
          productName: productObj.idproduct?.productName || 'Nombre no disponible',
          idproduct: productObj.idproduct?._id || productObj.idproduct
        };
      })
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

//insert :
ordersControllers.createOrders = async (req,res)=>{
    const{idClient,products,reservationDate,quantity,total} = req.body;

    const newOrder = new ordersModel({
        
        idClient,
        products,
        reservationDate,
        quantity,
        total,
    });
    await newOrder.save();
    res.status(201).json({message:"Order created"});

};

//Delete 
ordersControllers.deleteOrders = async (req,res)=>{
 const deleteOrders = await ordersModel.findByIdAndDelete(req.params.id);
  if(!deleteOrders){
    return res.status(404).json({message:"customer dont find"});
  }
  res.json({message:"Order deleted"})

};

//Update 

ordersControllers.updateOrders = async(req,res) =>{
    const{idClient,products,reservationDate,quantity,total} = req.body;

    await ordersModel.findByIdAndUpdate(
        req.params.id,
        {   
            
            idClient,
            products,
            reservationDate,
            quantity,
            total
        },
        { new:true
        }
    );

    //muestro mensajee:
    res.json({message:" Orders Updated"})

};
export default ordersControllers;