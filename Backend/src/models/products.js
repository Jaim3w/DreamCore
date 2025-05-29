/*
idCategory
idBrand
productName
description
price
stock
productImage
*/

import { Schema, model} from "mongoose";

const productsSchema = new Schema(
  {
    idCategory: {
      type: Schema.Types.ObjectId,
      ref: "categories", 
      required: [true, "El ID del catefories es obligatorio"],
    },
    idBrand: {
      type: Schema.Types.ObjectId,
      ref: "brands", 
      required: [true, "El ID del brands es obligatorio"],
    },
    productName: {
      type: String,
      required: true,  // Corregido de 'require' a 'required'
      maxLength: 500,  // Corregir 'maxHeight' a 'maxLength'
    },
    description: {
      type: String,
      required: true,  // Corregido de 'require' a 'required'
      minlength: 50,  // Correcto
    },
    price: {
      type: Number,
      required: true,  // Corregido de 'require' a 'required'
    },
    stock: {
      type: Number,
      required: true,  // Corregido de 'require' a 'required'
    },
    productImage: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("products", productsSchema);