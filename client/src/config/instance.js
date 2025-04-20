// src/utils/axiosInstance.js
import axios from "axios";

// Create an axios instance with baseURL set to localhost:3001
const instance = axios.create({
  baseURL: "http://localhost:3001/api/v1", // Base URL
  headers: {
    "Content-Type": "application/json", // Optional, adjust according to your API needs
  },
});

// Interceptor to return response.data directly
instance.interceptors.response.use(
  (response) => response.data, // If the response is successful, return only the data
  (error) => {
    // Check if error.response exists and return error.response.data
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    // In case of network or other errors, return the error object itself
    return Promise.reject(error);
  }
);

export { instance };
