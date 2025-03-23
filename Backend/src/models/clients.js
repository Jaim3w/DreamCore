/*
clients

idClient
name
Lastname
email
password
birthDate
Phone
ProfilePicture
*/




import { Schema } from "mongoose";

const clientsSchema = new Schema(
{

    name: {
        type: String,
        require: true,
        maxHeight:100 ,
        match: [
          /^[A-Za-z\s]+$/,
          "El nombre solo puede contener letras y espacios",
        ],
      },
      lastName: {
        type: String,
        require: true,
        maxHeight:100,
      }, 
      email:{
        type:String,
        require:true,
        maxHeight: 100,
        match: [
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
          "Por favor, ingrese un correo electrónico válido",
        ],
      },
      password:{
        type:String,
        require:true,
        minlength: 6,
        
      },
<<<<<<< HEAD
},{
  timestamps: true,
  strict:false
}

)

export default model("clients", clientsSchema)
=======
      birthDate:{
      type:Date,
      require:true,
      },
      phone:{
        type: String,
        required: true,
        match: [
          /^[0-9]{8}$/,
          "El teléfono debe contener exactamente 8 dígitos numéricos",
        ],
      },
      profilePicture:{
        type:String,
      }
},{
  timestamps: true,
  strict: false,
}

);
export default model("clients", clientsSchema);
>>>>>>> 39598ce2a1e3d0f185caf8931d277cdc077ed2bd
