import categoriesModel from "../models/Categories.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";

// 1. Configurar Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

// 2. Controlador
const categoriesController = {};

// 3. Obtener todas las categorías
categoriesController.getCategories = async (req, res) => {
  const categories = await categoriesModel.find();
  res.json(categories);
};

// 4. Insertar una categoría
categoriesController.createCategories = async (req, res) => {
  const { categoryName } = req.body;
  let imageURL = "";

  // Subir imagen a Cloudinary
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "categories",
      allowed_formats: ["jpg", "jpeg", "png"],
    });
    imageURL = result.secure_url;
  }

  // Guardar en la BD
  const newCategory = new categoriesModel({ categoryName, image: imageURL });
  await newCategory.save();

  res.json({ message: "Categoría guardada correctamente" });
};

// 5. Actualizar categoría
categoriesController.updateCategories = async (req, res) => {
  const { categoryName } = req.body;
  let imageURL = "";

  // Subir imagen a Cloudinary si se proporciona
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "categories",
      allowed_formats: ["jpg", "jpeg", "png"],
    });
    imageURL = result.secure_url;
  }

  // Construir datos a actualizar
  const updateData = { categoryName };
  if (imageURL) updateData.image = imageURL;

  await categoriesModel.findByIdAndUpdate(req.params.id, updateData, { new: true });

  res.json({ message: "Categoría actualizada correctamente" });
};

// 6. Eliminar categoría
categoriesController.deleteCategories = async (req, res) => {
  const deletedCategory = await categoriesModel.findByIdAndDelete(req.params.id);
  if (!deletedCategory) {
    return res.status(404).json({ message: "Categoría no encontrada" });
  }
  res.json({ message: "Categoría eliminada correctamente" });
};

export default categoriesController;
