/*
    Campos:
        idBrand
        brandName
        phoneNumber
        emailBrand


*/

import { Schema, model } from "mongoose";

const brandsSchema = new Schema(
  {
    brandName: {
      type: String,
      require: true,
    },
    phoneNumber: {
        type: String,
        require: true,
      },
      emailBrand: {
        type: String,
        require: true,
      },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Brands", brandsSchema);
