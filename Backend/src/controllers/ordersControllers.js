// Metodos:(C R U D)

const ordersControllers = {};
import ordersModel from "../models/orders.js";

//select:
ordersControllers.getOrders = async (req,res) =>{
 try{
    const Orders = await ordersModel.find()
 .populate("products", "name PRICE")
 .populate("idClient", "name CLIENT");
 res.status(200).json(Orders);
} catch (error) {
  res.status(500).json({ message: "Error fetching orders", error: error.message });
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

//Mostrar solo uno 

ordersControllers.getOrder = async (req,res)=> {
    try{
        const Order = await ordersModel.findById(req.params.id)
        .populate("idproduct", "name PRICE")
        .populate("idClient", "name CLIENT");
       if(!Order){
        return res.status(404).json({ message: "Order not found" });
       }
       res.status(200).json(Order);   
    }
    catch(error)
    {
        res.status(500).json({ message: "Error fetching the order", error: error.message });
    }
    
    };

    export default ordersControllers;