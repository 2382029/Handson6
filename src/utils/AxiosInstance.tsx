<<<<<<< HEAD
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
=======
import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://dummyjson.com"
});

export default AxiosInstance;
>>>>>>> 9c3a06b332dea2eee06cdae0073f329a91f64d74
