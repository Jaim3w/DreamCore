import dotenv  from "dotenv"
 
dotenv.config();
 
export const config ={
db:{
    URI: process.env.DB_URI
    
},
server:{
    PORT: process.env.PORT
},
cloudinary: {
    cloud_name: process.env.CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET
  }
}
//safas
