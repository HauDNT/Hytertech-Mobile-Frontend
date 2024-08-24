import envConfig from "../config/EnvConfig";
import axios from "axios";

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
    config => {
        // Ở đây chúng ta sẽ thực hiện 1 thao tác gì đó trước khi gửi request
        // Ví dụ: Thêm token, role_id vào header để thông qua middleware

        // const token = localStorage.getItem("token");

        // if (token) {
        //     config.headers.Authorization = `${token}`;
        // };

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
