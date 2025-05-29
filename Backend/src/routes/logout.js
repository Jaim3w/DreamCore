import express from "express";
const router = express.Router();


import logoutControler from "../controllers/logoutController.js";

router.route("/")
.post(logoutControler.logout);

export default router;