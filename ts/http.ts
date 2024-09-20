import axios from "axios";
import { toast } from "sonner";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

const http = axios.create({
  baseURL,
});

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

http.handleError = (error) => {
  if (!axios.isAxiosError(error)) {
    return toast.error("An unexpected error occurred");
  }

  if (!error.response) {
    return toast.error("Could not connect to the server");
  }

  if (error.response.status === 401) {
    return toast.error("Unauthorized");
  }

  if (error.response.status === 403) {
    return toast.error("Forbidden");
  }

  const { message, errors } = error.response.data;

  return toast.error(message, {
    description: JSON.stringify(errors, null, 2),
  });
};

http.fetcher = (url) => http.get(url).then((res) => res.data);

export default http;
