import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../config.js";
import clientsModel from "../models/clients.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

const registerClientController = {};

// REGISTRO de cliente con envío de código de verificación por correo
registerClientController.register = async (req, res) => {
  const { name, lastName, email, password, birthDate, phone, profilePicture } = req.body;

  // Validar campos obligatorios
  if (!name || !lastName || !email || !password || !birthDate || !phone) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const existingClient = await clientsModel.findOne({ email });
    if (existingClient) {
      return res.status(409).json({ message: "El cliente ya existe" });
    }

    // Encriptar contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    const newClient = new clientsModel({
      name,
      lastName,
      email,
      password: passwordHash,
      birthDate,
      phone,
      profilePicture: profilePicture || ""
    });

    await newClient.save();

    // Generar código de verificación
    const verificationCode = crypto.randomInt(10000, 99999).toString();
    const expiresAt = Date.now() + 2 * 60 * 60 * 1000; 

    const tokenCode = jwt.sign(
      { email, verificationCode, expiresAt },
      config.jwt.secret,
      { expiresIn: "2h" }
    );

    res.cookie("verificationToken", tokenCode, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // <-- Asegura que la cookie se envíe en desarrollo
      maxAge: 2 * 60 * 60 * 1000,
    });
    console.log("Cookie enviada en registro"); // <-- Agrega este log

    // Configuración del correo electrónico
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.email,
        pass: config.email.password,
      },
    });

    const mailOptions = {
      from: config.email.username,
      to: email,
      subject: "Verificación de correo electrónico - DreamCore",
      text: `¡Hola ${name}!\n\nTu código de verificación es: ${verificationCode}\n(5 dígitos numéricos, válido por 2 horas)`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      // Si falla el correo, elimina el usuario recién creado
      await clientsModel.deleteOne({ email });
      console.error(err);
      return res.status(500).json({ message: "Error enviando el correo" });
    }

    res.status(201).json({
      message: "Cliente registrado. Verifica tu correo con el código enviado.",
      token: tokenCode,
    });

  } catch (error) {
    res.status(500).json({ message: "Error al registrar cliente", error: error.message });
  }
};

// VERIFICACIÓN DEL CÓDIGO DE EMAIL
registerClientController.verifyCodeEmail = async (req, res) => {
  console.log("Cookies recibidas:", req.cookies); // <-- Log para depuración
  const { verificationCode } = req.body;
  const token = req.cookies.verificationToken;

  if (!token) {
    return res.status(401).json({ message: "No se proporcionó token de verificación" });
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    const { email, verificationCode: storedCode } = decoded;

    if (verificationCode !== storedCode) {
      return res.status(400).json({ message: "Código de verificación incorrecto" });
    }

    const client = await clientsModel.findOne({ email });
    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    client.isVerified = true;
    await client.save();
    res.clearCookie("verificationToken");

    res.status(200).json({ message: "Correo verificado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error verificando correo", error: error.message });
  }
};

export default registerClientController;