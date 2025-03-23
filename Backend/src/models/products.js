/*
idCategory
idBrand
productName
description
price
stock
productImage
*/




import { Schema } from "mongoose";

const productsSchema = new Schema(
{

    idCategory:{
        type: Schema.Types.ObjectId,
        ref: "categories", 
        required: [true, ""],
      },
      idBrand:{
        type: Schema.Types.ObjectId,
        ref: "brands", 
        required: [true, ""],
      }, 
      productName:{
        type:String,
        require:true,
        maxHeight: 500,
      },
      description:{
        type:String,
        require:true,
        minlength: 50,
        
      },
      price:{
      type:Number,
      require:true,
      },
      stock:{
        type: Number,
        require:true,
        
      },
      productImage:[
        {
          url:{
                type: String
            }
        }],
    },
        {
  timestamps: true,
  strict: false,
}

);productsSchema
export default model("products", clientsSchema);