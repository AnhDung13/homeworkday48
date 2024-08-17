import axios from "axios";
import Cookies from "js-cookie";
import { API_KEY } from "./token";
import { urlApi } from "./API";
import { toast } from "react-toastify";

const apiKey = Cookies.get(API_KEY);

const axiosInstance = axios.create({
  baseURL: urlApi,
  headers: { "X-Api-Key": apiKey },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.data.code === 401) {
      Cookies.remove("apiKey");
      Cookies.remove("userEmail");
      toast.error("Đã xảy ra lỗi vui lòng reload lại !");
    }
  }
);

export default axiosInstance;
