import axios from "axios";

let accessToken = "";
let refreshToken = "";

export const setTokens = (access_Token: string, refresh_Token: string) => {
  accessToken = access_Token;
  localStorage.setItem("refreshToken", refresh_Token);
};

export const publicAxios = axios.create({
  baseURL: import.meta.env.VITE_SUPABASE_URL,
  headers: {
    apiKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
});

export const privateAxios = axios.create({
  baseURL: import.meta.env.VITE_SUPABASE_URL,
  headers: {
    apiKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
});

privateAxios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${accessToken}`;
  config.headers["Content-Type"] = "application/json";
  console.log(refreshToken);
  return config;
});
