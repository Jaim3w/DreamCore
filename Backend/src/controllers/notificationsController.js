const notificationsController = {};
import notificationsModel from "../models/Notifications.js";

// SELECT
notificationsController.getNotifications = async (req, res) => {
  const notifications = await notificationsModel.find();
  res.json(notifications);
};

// INSERT
notificationsController.createNotifications = async (req, res) => {
  const { title, message } = req.body;
  const newNotification = new notificationsModel({ title, message });
  await newNotification.save();
  res.json({ message: "Notificación guardada" });
};

// DELETE
notificationsController.deleteNotifications = async (req, res) => {
  const deletedNotification = await notificationsModel.findByIdAndDelete(req.params.id);
  if (!deletedNotification) {
    return res.status(404).json({ message: "Notificación no encontrada" });
  }
  res.json({ message: "Notificación eliminada" });
};

// UPDATE
notificationsController.updateNotifications = async (req, res) => {
  // Solicito todos los valores
  const { title, message } = req.body;
  // Actualizo
  await notificationsModel.findByIdAndUpdate(
    req.params.id,
    {
        title, 
        message
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "notificación actualizada" });
};

export default notificationsController;