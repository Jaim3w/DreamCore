import { Schema, model } from "mongoose";

const clientsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 100,
      match: [
        /^[\p{L}\s]+$/u,
        "El nombre solo puede contener letras y espacios",
      ],
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 100,
      match: [
        /^[\p{L}\s]+$/u,
        "El apellido solo puede contener letras y espacios",
      ],
    },
    email: {
      type: String,
      required: true,
      maxLength: 100,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
        "Por favor, ingrese un correo electrónico válido",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: [
        /^[0-9]{8}$/,
        "El teléfono debe contener exactamente 8 dígitos numéricos",
      ],
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default model("clients", clientsSchema);
