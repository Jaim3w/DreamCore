import reviewsModel from "../models/reviews.js";

const reviewsController = {};


//Ingresar review

reviewsController.createReview = async (req, res) => {
    const { idClient, idProduct, title, message, } = req.body;
    const newReview = new reviewsModel({ idClient, idProduct, title, message, });
    await newReview.save();
    res.json({ message: "review saved" });
  };

// OBTENER TODOS Las reviews
reviewsController.getReviews = async (req, res) => {
  try {
    const review = await reviewsModel.find()
    .populate("idClient", "name")
    .populate("idProduct", "productName");
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

// OBTENER UN CLIENTE POR ID
reviewsController.getReview= async (req, res) => {
  try {
    const review = await reviewsModel.findById(req.params.id)
    .populate("idClient", "name")
    .populate("idProduct", "productName");
    if (!review) {
      return res.status(404).json({ message: "review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};



// ACTUALIZAR UN CLIENTE
reviewsController.updateReviews= async (req, res) => {
  const { idClient, idProduct, title, message, } = req.body;

  // Validación de campos requeridos
  if (!idClient || !idProduct || !title || !message ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updateReview = await reviewsModel.findByIdAndUpdate(
      req.params.id,
      {
         idClient, idProduct, title, message, 
      },
      { new: true }
    )
    .populate("idClient", "name")
      .populate("idProduct", "productName");

    if (!updateReview) {
      return res.status(404).json({ message: "reiew not found" });
    }

    res.json({ message: "review updated"});
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

// ELIMINAR UN CLIENTE
reviewsController.deleteReviews = async (req, res) => {
  try {
    const deletedReviews = await reviewsModel.findByIdAndDelete(req.params.id);
    if (!deletedReviews) {
      return res.status(404).json({ message: "review not found" });
    }
    res.json({ message: "review deleted"});
  } catch (error) {
    res.status(500).json({ message: "Error ", error: error.message });
  }
};

export default reviewsController;