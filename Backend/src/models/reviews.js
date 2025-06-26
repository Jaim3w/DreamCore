/*
reviews:
idClient
idProduct
title
message
*/
import { Schema, model } from "mongoose";

const reviewsSchema = new Schema(
  {
    idClient: {
      type: Schema.Types.ObjectId,
      ref: "Clients", // Referencia a la colección de clientes
      required: [true, "El ID del cliente es obligatorio"],
    },
    idProduct: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: [true, "El ID del product es obligatorio"],
      },
    
    title: {
        type: String,
        require: true,
        maxHeight: 100 ,
        minlength: 6
      },
      message: {
        type: String,
        required: true,
        minlength: 6,
        maxHeight: 1000
      },
  },
  {
    timestamps: true, // Campos createdAt y updatedAt
    strict: false,
  }
);

export default model("reviews", reviewsSchema);