import express from "express";
import brandsController from "../controllers/brandsController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(brandsController.getBrands)
  .post(brandsController.createBrands);

router
  .route("/:id")
  .put(brandsController.updateBrands)
  .delete(brandsController.deleteBrands);

export default router;