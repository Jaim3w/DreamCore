import { Schema, model } from "mongoose";

const clientsSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
      trim: true,
    },
    lastName: {
      type: String,
      default: "",
      trim: true,
    },
    email: {
      type: String,
      required: true,   // Lo dejamos requerido porque Google SI nos devuelve email
      trim: true,
      lowercase: true,
      unique: true,     // 👈 Puedes quitarlo si quieres permitir duplicados
    },
    password: {
      type: String,
      required: true,   // Google le manda uno generado automáticamente
    },
    birthDate: {
      type: String,
      default: "",      // No requerido
    },
    phone: {
      type: String,
      default: "",      // No requerido
    },
    profilePicture: {
      type: String,
      default: "",      // Opcional para cuando quieras agregar foto de perfil
    },
  },
  {
    timestamps: true,
  }
);

export default model("Clients", clientsSchema);
