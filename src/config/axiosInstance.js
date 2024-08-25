import axios from "axios";
import envConfig from "../config/EnvConfig";
import { getData } from "../config/SecureStorage";

// Instance axios với cấu hình mặc định
const axiosInstance = axios.create({
    baseURL: envConfig.URL_SERVER,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor để xử lý request
axiosInstance.interceptors.request.use(
    async config => {
        const token = await getData("login-token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        };

        return config;
    },
    error => {
        // Xử lý lỗi gửi request
        return Promise.reject(error);
    }
);

// Interceptor để xử lý response
axiosInstance.interceptors.response.use(
    response => {
        // Làm gì đó với dữ liệu response
        return response;
    },
    error => {
        // Xử lý lỗi response
        return Promise.reject(error);
    }
);

export default axiosInstance;
