import express from "express";
import categoriesController from "../controllers/categoriesController.js";
import multer from "multer";

// Crear el router
const router = express.Router();

// Configurar carpeta local temporal para subir imágenes
const upload = multer({ dest: "public/" });

// Rutas
router
  .route("/")
  .get(categoriesController.getCategories)
  .post(upload.single("image"), categoriesController.createCategories);

router
  .route("/:id")
  .put(upload.single("image"), categoriesController.updateCategories)
  .delete(categoriesController.deleteCategories);

export default router;
