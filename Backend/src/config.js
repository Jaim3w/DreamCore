import dotenv  from "dotenv"
import { v2 as cloudinary } from "cloudinary";
dotenv.config();
 
export const config ={
db:{
    URI: process.env.DB_URI
    
},
server:{
    PORT: process.env.PORT
},
admin:{
email:process.env.ADMIN_EMAIL,
password: process.env.ADMIN_PASSWORD,

},
jwt:{
secret: process.env.JWT_SECRET,
expiresIn:process.env.JWT_EXPIRES

},
cloudinary: {
    cloud_name: process.env.CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET
  }
}
