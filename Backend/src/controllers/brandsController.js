const brandsController = {};
import brandsModel from "../models/Brands.js";

// SELECT
brandsController.getBrands = async (req, res) => {
  const brands = await brandsModel.find();
  res.json(brands);
};

// INSERT
brandsController.createBrands = async (req, res) => {
  const { brandName, phoneNumber, emailBrand } = req.body;
  const newBrand = new brandsModel({ brandName, phoneNumber, emailBrand });
  await newBrand.save();
  res.json({ message: "Marca guardada" });
};

// DELETE
brandsController.deleteBrands = async (req, res) => {
  const deletedBrand = await brandsModel.findByIdAndDelete(req.params.id);
  if (!deletedBrand) {
    return res.status(404).json({ message: "Marca no encontrada" });
  }
  res.json({ message: "Marca eliminada" });
};

// UPDATE
brandsController.updateBrands = async (req, res) => {
  // Solicito todos los valores
  const { brandName, phoneNumber, emailBrand } = req.body;
  // Actualizo
  await brandsModel.findByIdAndUpdate(
    req.params.id,
    {
        brandName, 
        phoneNumber, 
        emailBrand
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "Marca actualizada" });
};

export default brandsController;