import express from "express";
import multer from "multer"

const router = express.Router();

import productsController from "../controllers/productsController.js";
const upload = multer({dest: "public/"})

router.route("/")
.get(productsController.getProducts)
.post(upload.single("productImage"), productsController.createProducts);

router.route("/:id")
  .get(productsController.getproduct)
  .put(upload.single("productImage"), productsController.updateProducts)
  .delete(productsController.deleteProducts);

export default router;