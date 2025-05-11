// Integration API (Axios & Tanstack Query)
export const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// User Credentials
export const TOKEN = "jwtToken";
export const ID_USER = "idUser";
export const USERNAME = "username";
export const DOCUMENT_ID = "documentId";
export const EMAIL = "email";

// Bearer Token - JWT
export const BEARER_TOKEN =
  sessionStorage.getItem(TOKEN) ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTg3LCJpYXQiOjE3NDY4NzI0ODYsImV4cCI6MTc0OTQ2NDQ4Nn0.MpYSRsUwkAGrB9qTvB5rx8BmWi7IPxw4UNnexG_kbDM";
