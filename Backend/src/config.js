import dotenv  from "dotenv"
 
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

}
}
//safasdgfsfdgsfddzfcsdzcszcfas
