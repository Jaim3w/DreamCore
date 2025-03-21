// importar todo lo de la libreria "express"
import express from "express";
import clientsRoutes from "./src/routes/Clients.js";
import reviewsRoutes from "./src/routes/Reviews.js";


// Creo una constante que es igual a la libreria que
// acabo de importar y lo ejecuto
const app = express();

// middleware para aceptar datos desde postman
app.use(express.json());
app.use("/api/clients", clientsRoutes);
app.use("/api/reviews", reviewsRoutes)


// Exporto la constante para poder usar express en otros
// archivos
export default app;