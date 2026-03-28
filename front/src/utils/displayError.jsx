import { toast } from "react-toastify";

export const displayError = (msg, id) => {
    if (!msg) return

    const theme = localStorage.getItem('dashboard-theme');

    msg = msg.trim()[0].toUpperCase() + msg.slice(1);
    if (toast.isActive(id))
        return;

    toast.error(msg, {
        toastId: id,
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: theme || 'light',
    })
};