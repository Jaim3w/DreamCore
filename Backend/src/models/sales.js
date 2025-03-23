/*Sales:
idSale
idOrder
payMentmethod
address
state
*/
import { Schema, model } from 'mongoose';

const salesSchema = new Schema(
{
    idOrder: {
        type: Schema.Types.ObjectId,
        ref: "Orders",
        required: true,
      },
      payMentmethod: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
        minlength: [10, "La dirección debe tener al menos 10 caracteres"],
      },
      state: {
        type: String,
        required: true,
      },
      
},
{
    
        timestamps: true,
        strict: false,
      
}
);

export default model("Sales", salesSchema);