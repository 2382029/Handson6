// utils/AxiosInstance.ts
import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: "https://dummyjson.com/", // Base URL for the API
    headers: {
        "Content-Type": "application/json", // Default content type for requests
    },
});

export default axiosInstance;
