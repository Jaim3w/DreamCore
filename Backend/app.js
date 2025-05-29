// importar todo lo de la libreria "express"
import cors from "cors";
import express from "express";
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


// Creo una constante que es igual a la libreria que
// acabo de importar y lo ejecuto
const app = express();    

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);


// middleware para aceptar datos desde postman
app.use(express.json());
//app.use(cookieParser());
// Definir las rutas de las funciones que tendrá la página web
app.use("/api/categories", categoriesRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/brands", brandsRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/products", productsRoutes);
app.use ("/api/orders", ordersRoutes);
app.use("/api/login",loginRoutes);
app.use("/api/logout",logoutRoutes);



// Exporto la constante para poder usar express en otros
// archivos
// Verificación de estado para el cliente (usada en AuthContext)
app.head("/api", (req, res) => res.sendStatus(200));

export default app;