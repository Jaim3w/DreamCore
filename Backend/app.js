// importar todo lo de la libreria "express"
import express from "express";
<<<<<<< HEAD
import clientsRoutes from "./src/routes/Clients.js";
import reviewsRoutes from "./src/routes/Reviews.js";
=======
import categoriesRoutes from "./src/routes/categories.js";
import notificationsRoutes from "./src/routes/notifications.js";
import brandsRoutes from "./src/routes/brands.js";
>>>>>>> d7311b4f3266e76f17411d6fca7c544a38d87468


// Creo una constante que es igual a la libreria que
// acabo de importar y lo ejecuto
const app = express();      

// middleware para aceptar datos desde postman
app.use(express.json());
<<<<<<< HEAD
app.use("/api/clients", clientsRoutes);
app.use("/api/reviews", reviewsRoutes)

=======

// Definir las rutas de las funciones que tendrá la página web
app.use("/api/categories", categoriesRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/brands", brandsRoutes);
>>>>>>> d7311b4f3266e76f17411d6fca7c544a38d87468

// Exporto la constante para poder usar express en otros
// archivos
export default app;