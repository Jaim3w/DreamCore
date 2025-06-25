import express from "express";
const router =express.Router();
import ordersControllers from "../controllers/ordersControllers.js";


router.route("/")
.get(ordersControllers.getOrders)
.post(ordersControllers.createOrders)
router.get("/client/:clientId", ordersControllers.getOrdersByClient);

router.route("/:id")
.get(ordersControllers.getOrder)
.put(ordersControllers.updateOrders)
.delete(ordersControllers.deleteOrders)


export default router;