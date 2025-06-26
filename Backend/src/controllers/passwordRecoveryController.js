import jwt, { decode } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import clientModel from "../models/clients.js";
import { sendEmail, HTMLRecoveryEmail} from "../utils/passwordRecoveryMail.js";
import { config } from "../config.js";


const passwordRecoveryCONTROLLER = {};
passwordRecoveryCONTROLLER.requestCode = async (req,res) => {
    const {email}= req.body;

    try {
        
        if(!email) return res.status(400).json({message: "Email is required"});
        let user;
        let userType = null;

        user = await clientModel.findOne({ email});
        if (user) {
            userType = "client";
            
        }

        if(!user) return res.status(400).json({message:"User not found"})

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        //Creamos el token

        const token = jwt.sign({email,code,userType,verified:false},config.jwt.secret, {expiresIn:"15m"});

        //Guardamos el token en una cookie

        res.cookie("tokenRecoveryCode",token,{
            httpOnly: true,
            secure: false,
            maxAge: 15 * 60 * 1000,
        });

        await sendEmail(
      email,
      "Password Recovery Code",
      `Your verification code is: ${code}`,
      HTMLRecoveryEmail(code)
    );



        res.status(200).json({message:"Verification code sent to email "})
    } catch (error) {
        res.status(500).json({
            message:"Error sending verifaction code",
            error: error.message
        });
    }
};

passwordRecoveryCONTROLLER.verfyCode = async (req,res) => {
    const {code} = req.body;

    try {
        //validamos que no este vacion 
        if(!code) return res.status(400).json({message:"Se necesita el codigo"})

            const token = req.cookies.tokenRecoveryCode;

        if (!token) {
            return res 
            .status(401)
            .json({message:"No hay token , sin autorizacion"})
        }

        const decoded = jwt.verify(token, config.jwt.secret);

        //verificamos que el codigo sea correcto

        if (decoded.code !== code) {
            return res.status(403).json({message:"COdigo invalido"})
        }
        
        const newToken = jwt.sign(
            {email:decoded.email, code: decoded.code,userType:decoded.userType,verified:true},
            config.jwt.secret,
            {expiresIn:"15m"}
        );

        //Reemplazamos el token en la cookie con el nuevo token 

        res.cookie("tokenRecoveryCode",newToken,{
            httpOnly:true,
            secure:false,
            maxAge: 15 * 60 * 1000,
        });
        res.status(200).json({message:"Codigo verificado con exito"});
    } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(403)
        .json({ message: "Token expired, please request a new code" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token" });
    }
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//Restablece contra
passwordRecoveryCONTROLLER.resetPassword = async (req,res) => {
    const {newPassword} = req.body;

    try {
        const token = req.cookies.tokenRecoveryCode;

        if (!token) {
             return res.status(401).json({message:"Token is missing,unauthorized"});

        }
        const decoded = jwt.verify(token, config.jwt.secret);

        //Verficamos si el codigo fue verficado
        if(!decoded.verified){
            return res.status(400).json({message:"Code no verificado, no podemos restablecer su contrasena"});
        }

        const {email,userType}=decoded;

        let user;

        if (userType ==="client") {
            user= await clientModel.findOne({email});
        }
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        const hashedPassword = await bcrypt.hash(newPassword,10);

        let updatedUser;
        if (userType==="client") {
            updatedUser = await clientModel.findOneAndUpdate(
                {email},
            {password:hashedPassword},
        {new:true}
    );
        }
        if (!updatedUser)return res.status(404).json({message:"User not updated"});

    res.clearCookie("tokenRecoveryCode");

    res.status(200).json({message:"Password updated succesfully"});


    } catch (error) {
        if (error.name === "TokenExpiredError") {
      return res
        .status(403)
        .json({ message: "Token expired, please request a new code" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token" });
    }

    res
      .status(500)
      .json({ message: "Error resetting password", error: error.message });
  
    }
};

export default passwordRecoveryCONTROLLER;


