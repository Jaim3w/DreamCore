import express from "express";
import multer from "multer";

const router = express.Router();
import productsController from "../controllers/productsController.js";

const upload = multer({ dest: "public/" });

// Ruta para obtener todos los productos y para crear producto
router.route("/")
  .get(productsController.getProducts)
  .post(upload.single("productImage"), productsController.createProducts);

// Nueva ruta para obtener productos por categoría (por nombre de categoría)
router.get("/by-category/:categoryName", productsController.getProductsByCategory);

router.route("/:id")
  .get(productsController.getproduct)
  .put(upload.single("productImage"), productsController.updateProducts)
  .delete(productsController.deleteProducts);

export default router;
