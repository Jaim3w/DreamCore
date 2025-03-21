/*
    Campos:
        idNotification
        title
        message


*/

import { Schema, model } from "mongoose";

const notificationsSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    message:{
        type: String,
        require: true,
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Notifications", notificationsSchema);