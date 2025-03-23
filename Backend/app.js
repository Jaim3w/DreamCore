// importar todo lo de la libreria "express"
import express from "express";
import categoriesRoutes from "./src/routes/categories.js";
import notificationsRoutes from "./src/routes/notifications.js";
import brandsRoutes from "./src/routes/brands.js";
import salesRoutes from "./src/routes/sales.js";


// Creo una constante que es igual a la libreria que
// acabo de importar y lo ejecuto
const app = express();      

// middleware para aceptar datos desde postman
app.use(express.json());

// Definir las rutas de las funciones que tendrá la página web
app.use("/api/categories", categoriesRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/brands", brandsRoutes);
app.use("/api/sales", salesRoutes);

// Exporto la constante para poder usar express en otros
// archivos
export default app;