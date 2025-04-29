import { toast } from "sonner"

export const ToastError = (message : string) => {
    toast.error(message, {
        style : {
            background: "red",
            color: "white",
            padding: "25px",
            opacity: 0.8,
        }
    })
}

export const ToastSuccess = (message : string) => {
    toast.success(message, {
        style : {
            background: "green",
            color: "white",
            padding: "25px",
            opacity: 0.8,
        }
    })
}