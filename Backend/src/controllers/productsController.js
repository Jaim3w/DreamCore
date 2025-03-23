import productsModel from "../models/products.js";

const productsController = {};


//Ingresar review

productsController.createProducts = async (req, res) => {
    const { idCategory, idBrand, productName, description,price,stock, productImage  } = req.body;
    const newProducts = new productsModel({ idCategory, idBrand, productName, description,price,stock, productImage });
    await newProducts.save();
    res.json({ message: "review saved" });
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
      return res.status(404).json({ message: "review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};



// ACTUALIZAR UN producto
productsController.updateProducts= async (req, res) => {
  const{ idCategory, idBrand, productName, description,price,stock, productImage  } = req.body;

  // Validación de campos requeridos
  if (!idCategory || !idBrand || !productName || !description||price||stock||productImage ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updateProducts = await productsModel.findByIdAndUpdate(
      req.params.id,
      { idCategory, idBrand, productName, description,price,stock, productImage  },
      { new: true }
    )
    .populate("idCategory", "categoryName")
    .populate("idBrand", "brandName");

    if (!updateProducts) {
      return res.status(404).json({ message: "reiew not found" });
    }

    res.json({ message: "review updated"});
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

// ELIMINAR UN producto
productsController.deleteProducts = async (req, res) => {
  try {
    const deleteProducts = await productsModel.findByIdAndDelete(req.params.id);
    if (!deleteProducts) {
      return res.status(404).json({ message: "peroduct not found" });
    }
    res.json({ message: "product deleted"});
  } catch (error) {
    res.status(500).json({ message: "Error ", error: error.message });
  }
};

export default productsController;