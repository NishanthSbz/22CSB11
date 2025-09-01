import axios from "axios";
import { Log } from "../../../../Logging Middleware/logger";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    Log("frontend", "debug", "api", `Making ${config.method.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    Log("frontend", "error", "api", `Request failed: ${error.message}`);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
api.interceptors.response.use(
  (response) => {
    Log("frontend", "debug", "api", `Received successful response from ${response.config.url}`);
    return response;
  },
  (error) => {
    Log("frontend", "error", "api", `Response error: ${error.message}`);
    return Promise.reject(error);
  }
);

export default api;
