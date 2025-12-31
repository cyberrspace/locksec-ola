import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach Bearer token automatically
api.interceptors.request.use(
  (config) => {
    // Guard for SSR / build time
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
