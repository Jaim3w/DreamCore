import Sales from '../models/sales';
import Orders from '../models/orders';

const salesController = {};

//Read :Obtiene toda las ventas

salesController.getSales = async (req, res) => {
     try {const sales = await Sales.find()-populate('idOrder');
    res.json(sales);
     } catch (error) {
    res.status(500).json({
      message: "Error fetching purchases", error: error.message });
    }
}

//Compra en especifica
salesController.getSale = async (req, res) => {
    try {
        const sale = await Sales.findById(req.params.id).populate('idOrder');
        if (!sale) {
            return res.status(404).json({ message: "sale not found" });
          }
          res.json(purchase);
    } catch (error) {

        res.status(400).json({
            message: "Error fetching purchase", error: error.message });
    }
}

//Create: Crea una venta
salesController.createSales = async (req, res) => {
    const { idOrder, payMentmethod, address, state } = req.body;
    try {
        const order = await Orders.findById(idOrder);
        if (!order) {
            return res.status(404).json({ message: "order not found" });
        }
        const newSale = new Sales({ idOrder, 
            payMentmethod, 
            address, 
            state
         });
        await newSale.save();

        res.status(201).json({ message: "Sale created successfully" });
    } catch (error) {
        res.status(400).json({
            message: "Error creating sale", error: error.message });
    }
}

//Update: Actualiza una venta

salesController.updateSales = async (req, res) => {
    const{address, state} = req.body;
try {
    const updateSales = await Sales.findByIdAndUpdate(req.params.id, {
        address, state
    },{new: true}
);

if (!updateSales) {
    return res.status(404).json({ message: "sale not found" });
}
res.json({ message: "sale updated successfully" });



} catch (error) {}
res
.status(400)
.json({
    message: "Error updating sale", error: error.message });
};

//Delete: Elimina una venta

salesController.deleteSales = async (req, res) => {
    try{
        const deleteSales = await Sales.findByIdAndDelete(req.params.id);
        if (!deleteSales) {
            return res.status(404).json({ message: "sale not found" });
        }
        res.json({ message: "sale deleted successfully" });
    } catch (error) {
        res.status(400)
        .json({
            message: "Error deleting sale", error: error.message });
    }
}

export default salesController;