import express from "express";
import notificationsController from "../controllers/notificationsController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(notificationsController.getNotifications)
  .post(notificationsController.createNotifications);

router
  .route("/:id")
  .put(notificationsController.updateNotifications)
  .delete(notificationsController.deleteNotifications);

export default router;