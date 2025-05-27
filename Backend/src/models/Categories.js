/*
    Campos:
        idCategory
        categoryName
        image
*/

import { Schema, model } from "mongoose";

const categoriesSchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true, // corregido de 'require' a 'required'
    },
    image: {
      type: String, // Aquí se almacenará la URL de Cloudinary
      required: false, // Puedes poner true si es obligatorio
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("categories", categoriesSchema);
