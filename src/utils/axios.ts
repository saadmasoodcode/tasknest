import axios from "axios";

let accessToken = "";
let refreshToken = "";

export const publicAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    apiKey: import.meta.env.VITE_API_KEY,
  },
});

export const privateAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    apiKey: import.meta.env.VITE_API_KEY,
  },
});

// export const setAccessToken = (token: string) => {
//   accessToken = token;
// };

// export const setRefreshToken = (token: string) => {
//   refreshToken = token;
// };

export const setTokens = (accessToken: string, refreshToken: string) => {
  accessToken = accessToken;
  refreshToken = refreshToken;
};

privateAxios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${accessToken}`;
  config.headers["Content-Type"] = "application/json";
  return config;
});
