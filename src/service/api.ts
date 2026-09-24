import axios from "axios";

export const API_URL = import.meta.env.VITE_API_BASE_URL; // Akses URL dari .env

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data"; // Tambahkan header untuk form data
    } else {
      config.headers["Content-Type"] = "application/json"; // Tambahkan header
    }

    const token = localStorage.getItem("token"); // Ambil token dari local storage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Tambahkan token ke header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url: string = error.config?.url ?? "";

    const isAuthRoute =
      url.includes("/auth/login") || url.includes("/auth/register");

    if (status === 400 && !isAuthRoute) {
      localStorage.removeItem("token"); // hapus data user lain jika ada
      // Hindari redirect berulang kalau sudah di halaman login
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
