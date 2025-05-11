import { BEARER_TOKEN } from "@/core/constant";
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Inject Bearer token secara otomatis
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${BEARER_TOKEN}`;
  }
  return config;
});