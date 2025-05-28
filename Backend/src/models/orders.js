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
    required: [true, "El ID de clientes es Obligatorio"],
  },
  products: [{
    idproduct: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    productName: {  
      type: String,
      required: true
    },
    amount: {
      type: Number,
      min: [1, "La cantidad debe de ser al menos 1"],
      required: true,
    },
    totalPartial: {
      type: Number,
      required: true,
      min: [0, "El subtotal no puede ser negativo"]
    }
  }],
  reservationDate: {
    type: Date,
    required: true
  },
  quantity: {
    type: Number,
    min: [1, "La cantidad necesaria es 1"]
  },
  total: {
    type: Number,
    required: true,
    min: [0, "El total no puede ser negativo"]
  }
}, {
  timestamps: true,
});

export default model("Orders",ordersSchema);