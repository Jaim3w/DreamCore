import express from "express";

const router = express.Router();

import registerClientController from "../controllers/registerClientContrller.js";

// POST /api/register  → Registrar cliente
router.post("/", registerClientController.register);

// POST /api/register/verifyCodeEmail → Verificar correo electrónico
router.post("/verifyCodeEmail", registerClientController.verifyCodeEmail);
export default router;