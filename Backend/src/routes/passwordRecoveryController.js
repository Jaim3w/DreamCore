import express from "express";
import passwordRecoveryCONTROLLER from "../controllers/passwordRecoveryController.js";

const router =express.Router();

router.post("/requestCode",passwordRecoveryCONTROLLER.requestCode);

router.post("/verifyCode",passwordRecoveryCONTROLLER.verfyCode);

router.post("/resetPassword",passwordRecoveryCONTROLLER.resetPassword);
export default router;
