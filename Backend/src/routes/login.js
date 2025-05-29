import express from "express";
const router = express.Router();

import loginController from "../controllers/loginController.js";

// Ruta para hacer login
router.route("/").post(loginController.login);

// Ruta para verificar si el backend está activo
router.get("/status", (req, res) => {
  res.status(200).json({ message: "Backend activo" });
});

export default router;
