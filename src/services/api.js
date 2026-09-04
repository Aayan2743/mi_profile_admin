

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});

// Attach token - Improved version
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token attached successfully"); // For debugging
    } else {
      console.log("No token found in storage");
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // localStorage.removeItem("token");
      // sessionStorage.removeItem("token");
      localStorage.clear();
      sessionStorage.clear();
      console.warn("401 Unauthorized – token cleared");
    }
    return Promise.reject(error);
  },
);

export default api;
