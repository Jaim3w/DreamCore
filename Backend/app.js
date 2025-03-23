// importar todo lo de la libreria "express"
import express from "express";
import categoriesRoutes from "./src/routes/categories.js";
import notificationsRoutes from "./src/routes/notifications.js";
import brandsRoutes from "./src/routes/brands.js";
import salesRoutes from "./src/routes/sales.js";
import clientsRoutes from "./src/routes/Clients.js";
import reviewsRoutes from "./src/routes/Reviews.js";
import productsRoutes from "./src/routes/Products.js"
import ordersRoutes from "./src/routes/orders.jsS"

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
app.use("/api/clients", clientsRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/products", productsRoutes);
app.use ("/api/orders", ordersRoutes)


// Exporto la constante para poder usar express en otros
// archivos
export default app;