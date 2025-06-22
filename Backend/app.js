import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import categoriesRoutes from "./src/routes/categories.js";
import notificationsRoutes from "./src/routes/notifications.js";
import brandsRoutes from "./src/routes/brands.js";
import salesRoutes from "./src/routes/sales.js";
import clientsRoutes from "./src/routes/Clients.js";
import reviewsRoutes from "./src/routes/Reviews.js";
import productsRoutes from "./src/routes/Products.js";
import ordersRoutes from "./src/routes/orders.js";
import loginRoutes from "./src/routes/login.js";
import logoutRoutes from "./src/routes/logout.js";
import registerRoutes from "./src/routes/registerClient.js"; // 

const app = express();

// Permitir solicitudes del frontend
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Middleware para JSON y cookies
app.use(express.json());
app.use(cookieParser());

// Rutas de la API
app.use("/api/categories", categoriesRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/brands", brandsRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/register", registerRoutes); 

// Ruta simple para comprobar si el backend responde
app.head("/api", (req, res) => res.sendStatus(200));

export default app;
