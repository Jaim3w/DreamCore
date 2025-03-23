const categoriesController = {};
import categoriesModel from "../models/Categories.js";

// SELECT
categoriesController.getCategories = async (req, res) => {
  const categories = await categoriesModel.find();
  res.json(categories);
};

// INSERT
categoriesController.createCategories = async (req, res) => {
  const { categoryName } = req.body;
  const newCategorie = new categoriesModel({ categoryName });
  await newCategorie.save();
  res.json({ message: "categoría guardada" });
};

// DELETE
categoriesController.deleteCategories = async (req, res) => {
  const deletedCategorie = await categoriesModel.findByIdAndDelete(req.params.id);
  if (!deletedCategorie) {
    return res.status(404).json({ message: "Categoría no encontrada" });
  }
  res.json({ message: "categoría eliminada" });
};

// UPDATE
categoriesController.updateCategories = async (req, res) => {
  // Solicito todos los valores
  const { categoryName } = req.body;
  // Actualizo
  await categoriesModel.findByIdAndUpdate(
    req.params.id,
    {
        categoryName
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "categoría actualizada" });
};

export default categoriesController;