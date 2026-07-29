// import axios from "axios";

// export const BaseURL = "http://localhost:4000";

// export const AxiosInstance = axios.create({
//   baseURL: BaseURL,
// });

// // Add interceptor to attach token
// AxiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // or cookie

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


import axios from "axios";
import Cookies from "js-cookie"; // 1. Import js-cookie

export const BaseURL = "http://localhost:4000";

export const AxiosInstance = axios.create({
  baseURL: BaseURL,
  withCredentials: true, // 2. Optional: Good practice when working with cross-origin cookies/sessions
});

// Add interceptor to attach token from Cookie
AxiosInstance.interceptors.request.use(
  (config) => {
    // 3. Read token from Cookies instead of localStorage
    const token = Cookies.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);