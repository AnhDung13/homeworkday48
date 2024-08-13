import axios from "axios";
import Cookies from "js-cookie";
import { API_KEY } from "./token";

const apiKey = Cookies.get(API_KEY);

export const axiosInstance = axios.create({
  headers: { "X-Api-Key": apiKey },
});
