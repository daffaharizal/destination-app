import { BEARER_TOKEN } from "@/core/constant";
import axios from "axios";

export const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

// Inject Bearer token secara otomatis
apiAuth.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${BEARER_TOKEN}`;
  }
  return config;
});
