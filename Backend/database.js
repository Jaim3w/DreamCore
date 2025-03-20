import mongoose from "mongoose";
import { config } from "./src/config.js";
//1- Configurar la URI de la base de datos
//const URI =""; 



//2- Conecto la base de datos
mongoose.connect(config.db.URI);

// -------- Comprobar que todo funciona ----------

const connection = mongoose.connection;

//veo si funciona
connection.once("open", () => {
  console.log("DB is connected");
});

//veo si se desconectó
connection.on("disconnected", () => {
  console.log("DB is disconnected");
});

//veo si hay un error
connection.on("error", () => {
  console.log("Error en la conexión");
});
