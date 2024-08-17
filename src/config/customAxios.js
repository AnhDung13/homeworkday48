import axios from "axios";
import Cookies from "js-cookie";
import { API_KEY } from "./token";
import { urlApi } from "./API";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: urlApi,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const apiKey = Cookies.get(API_KEY);
    if (apiKey) {
      config.headers["X-Api-Key"] = apiKey;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Cookies.remove("apiKey");
      // Cookies.remove("userEmail");
      toast.error("Đã xảy ra lỗi vui lòng reload lại !");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
