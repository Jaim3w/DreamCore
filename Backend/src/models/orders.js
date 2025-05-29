/*
Campos:

idClient
products[{amount:,totalPartial:,idproduct:{}}]
reservationDate
quantity
total
*/

import{Schema,model} from "mongoose";

const ordersSchema = new Schema({
  idClient: {
    type: Schema.Types.ObjectId,
    ref: "clients",
    required: true,
  },
  products: [{
    idProduct: { // <- Aquí con P mayúscula
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1
    },
    totalPartial: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  reservationDate: {
    type: Date,
    required: true
  },
  quantity: {
    type: Number,
    min: 1
  },
  total: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});
export default model("Orders",ordersSchema);