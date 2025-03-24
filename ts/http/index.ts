import axios from "axios";
import { toast } from "sonner";

import { sleep } from "@/lib/utils";

const baseURL = import.meta.env.VITE_API_URL || "/api";

const http = axios.create({ baseURL });

const getToken = () => {
  if (typeof window === "undefined") return;

  return localStorage.getItem("token");
};

http.interceptors.request.use(async (request) => {
  const token = getToken();

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

http.handleError = async (error) => {
  if (!axios.isAxiosError(error)) {
    return toast.error("An unexpected error occurred");
  }

  if (!error.response) {
    return toast.error("Could not connect to the server");
  }

  if (error.response.status === 401) {
    localStorage.removeItem("token");
    toast.error("Unauthorized");
    await sleep(1000);
    location.replace("/login");
  }

  if (error.response.status === 403) {
    return toast.error("Forbidden");
  }

  const { errors, message } = error.response.data;

  return toast.error(message, {
    description: errors && errors.join("\n"),
    descriptionClassName: "whitespace-pre",
  });
};

http.fetcher = (url) => http.get(url).then((res) => res.data);

export default http;
