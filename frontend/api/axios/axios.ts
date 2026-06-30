import axios from "axios";

export const BaseURL = "http://localhost:4000";

export const AxiosInstance = axios.create({
  baseURL: BaseURL,
});

// Add interceptor to attach token
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or cookie

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);