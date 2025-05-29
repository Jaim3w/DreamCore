const logoutControler ={};
//import clients from "../models/clients.js";
//import bcrypt from "bcryptjs";
//import jwt from "jsonwebtoken";



logoutControler.logout = async (req, res) => {
    try {
        res.clearCookie('authToken', {
            httpOnly: true,
            path: "/",
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        });
        return res.status(200).json({ message: "Cerraste sesión correctamente" });
    } catch (error) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
    }
};
export default logoutControler;
