import { toast } from "react-toastify";
export const apiDomain = "http://localhost:8081";

export const notify = (errorMessage, toastId) => {
  toast.error(errorMessage, { toastId });
};
