import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifySuccess = (msg) =>
  toast.success(msg, {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    theme: "colored",
  });

export const notifyError = (msg) =>
  toast.error(msg, {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    theme: "colored",
  });

export default function ToastProvider() {
  return <ToastContainer />;
}
