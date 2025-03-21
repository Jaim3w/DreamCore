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
      },
      lastName: {
        type: String,
        require: true,
        maxHeight:100,
      }, 
      birthday:{
        type: Date,
        require: true,
        maxHeight: 50,
      },
      email:{
        type:String,
        require:true,
        maxHeight: 100,
        
      },
      password:{
        type:String,
        require:true,
      },
},{
  timestamps: true,
  strict:false
}

)

export default model("clients", clientsSchema)