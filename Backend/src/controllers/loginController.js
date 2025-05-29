import clientsModel from "../models/clients.js"
import bcrypt from "bcryptjs" 
import jwt from "jsonwebtoken"
import { config } from "../config.js"


const loginController ={};

//creamos login para clientes y admin 
loginController.login= async (req,res) => {

    const {email,password}= req.body;


    // validamos los campos 
    if (!email || !password) {
        return res.status(400).json({message:"Todos los campos son necesarios"})
    }

    try {

        let userFound;
        let userType;

        //Verificamos si es admin 

        if (email === config.admin.email && password === config.admin.password) {
            
            userType="admin";
            userFound ={_id:"admin"}


        }else{
            //Verificamos si es cliente
            userFound= await clientsModel.findOne({email});

            if (userFound) {
                userType="client";

                //comparamos las contras:

                const isMatch =await bcrypt.compare(password, userFound.password);
                if (!isMatch) {
                    return res.status(401).json({message:"Contra invalida"})
                }
                
            }

        
        }


        //Si no encuntra en en la collecion de clases devolvemos este error:

        if (!userFound) {
            console.log("No se encuentran en ninguna collecion");
            return res.status(401).json({message:"Usuario no encotnrado"})
            
        }
        

        //generamos el jwt


        jwt.sign(
            {
                id:userFound._id,
                userType,
            },
            config.jwt.secret,
            {
                expiresIn:config.jwt.expiresIn,
            },
            (error,token)=>{
                if (error) {
                    console.error(error);
                    return res.status(500).json({message:"Error al generar el token "});
                    
                }

                 res.cookie("authToken",token,{
                    httpOnly:true,
                    maxAge: 24*60*60*1000,
                    path:"/",
                    sameSite:"lax",
                    secure:process.env.NODE_ENV === 'production'


                 });
                 res.status(200).json({message: `${userType} login successful`, token }); 


            }

        );


    } catch (error) {

        res.status(500).json({message:"Errror",error:error.message})
        
    }
    
};

export default loginController;