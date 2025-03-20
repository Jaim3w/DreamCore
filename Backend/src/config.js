import dotenv  from "dotenv"

dotenv.config();

export const config ={
db:{
    URI: process.env.DB_URL
    
},
server:{
    PORT: process.env.PORT
}


}