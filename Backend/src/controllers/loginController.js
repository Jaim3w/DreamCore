import clientsModel from "../models/clients.js"
import bcrypt from "bcryptjs" 
import jwt from "jsonwebtoken"
import { config } from "../config.js"

const loginController = {};

loginController.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Todos los campos son necesarios" });
  }

  try {
    let userFound;
    let userType;

    if (email === config.admin.email && password === config.admin.password) {
      userType = "admin";
      userFound = { _id: "admin", email: config.admin.email };
    } else {
      userFound = await clientsModel.findOne({ email });
      if (userFound) {
        userType = "client";

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
          return res.status(401).json({ message: "Contraseña inválida" });
        }
      }
    }

    if (!userFound) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    jwt.sign(
      {
        id: userFound._id,
        userType,
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.expiresIn,
      },
      (error, token) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Error al generar el token" });
        }

        res.cookie("authToken", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({
          message: `${userType} login successful`,
          token,
          user: {
            _id: userFound._id,
            email: userFound.email,
            name: userFound.name, // Si tienes más datos puedes incluirlos
            userType,
          },
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export default loginController;
