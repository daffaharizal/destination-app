import { BEARER_TOKEN, TOKEN } from "@/lib";
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${BEARER_TOKEN}`;
  }
  return config;
});