import productsModel from "../models/products.js";
import { v2 as cloudinary } from "cloudinary";

import { config } from "../config.js";

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

const productsController = {};

productsController.createProducts = async (req, res) => {
  console.log("Datos recibidos en el backend:", req.body);

  const { idCategory, idBrand, productName, description, price, stock } = req.body;

  // Validar campos básicos
  if (!idCategory || !idBrand || !productName || !description || !price || !stock) {
    return res.status(400).json({
      error: "Todos los campos son obligatorios",
    });
  }

  // Validar que haya imagen
  if (!req.file) {
    return res.status(400).json({
      error: "La imagen es obligatoria",
    });
  }

  try {
    // Subir la imagen a Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "public",
      allowed_formats: ["jpg", "png", "jpeg"],
    });

    const imageURL = result.secure_url;

    // Crear el nuevo producto
    const newProduct = new productsModel({
      idCategory,
      idBrand,
      productName,
      description,
      price,
      stock,
      productImage: imageURL,
    });

    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: error.message });
  }
};


// OBTENER TODOS Las producto
productsController.getProducts = async (req, res) => {
  try {
    const review = await productsModel.find()
    .populate("idCategory", "categoryName")
    .populate("idBrand", "brandName");
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

// OBTENER UN producto POR ID
productsController.getproduct= async (req, res) => {
  try {
    const review = await productsModel.findById(req.params.id)
    .populate("idCategory", "categoryName")
    .populate("idBrand", "brandName");
    if (!review) {
      return res.status(404).json({ message: "Products not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

// ACTUALIZAR UN producto
productsController.updateProducts= async (req, res) => {
  const{ idCategory, idBrand, productName, description,price,stock, productImage   } = req.body;
  let imageURL = "";

   //Subir la nueva imagen a Cloudinary
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "public",
      allowed_formats: ["jpg", "png", "jpeg"],
    });
    imageURL = result.secure_url;
  }

  // Validación de campos requeridos
  if (!idCategory || !idBrand || !productName || !description||!price||!stock||!productImage ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updateProducts = await productsModel.findByIdAndUpdate(
      req.params.id,
      { idCategory, idBrand, productName, description,price,stock, productImage: imageURL },
      { new: true }
    )
    .populate("idCategory", "categoryName")
    .populate("idBrand", "brandName");

    if (!updateProducts) {
      return res.status(404).json({ message: "reiew not found" });
    }

    res.json(updateProducts);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

// ELIMINAR UN producto
productsController.deleteProducts = async (req, res) => {
  try {
    const deleteProducts = await productsModel.findByIdAndDelete(req.params.id);
    if (!deleteProducts) {
      return res.status(404).json({ message: "product not found" });
    }
    res.json({ message: "product deleted"});
  } catch (error) {
    res.status(500).json({ message: "Error ", error: error.message });
  }
};
productsController.getProductsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;

    // Buscar la categoría por nombre (case insensitive)
    const categoria = await categoryModel.findOne({
      categoryName: new RegExp(`^${categoryName}$`, "i"),
    });

    if (!categoria) {
      return res.status(200).json([]); // Si no existe, devolver array vacío
    }

    // Buscar productos con esa categoría
    const productos = await productsModel
      .find({ idCategory: categoria._id })
      .populate("idCategory", "categoryName")
      .populate("idBrand", "brandName");

    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export default productsController;