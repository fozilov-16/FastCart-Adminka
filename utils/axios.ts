import axios from "axios";
import { API_URL } from "../src/config/env";


export const SaveToken = (token: string) => {
  localStorage.setItem("authToken", token);
};

export const GetToken = () => {
  return localStorage.getItem("authToken");
};

export const axiosRequest = axios.create({
  baseURL: API_URL,
});

axiosRequest.interceptors.request.use(
  (config) => {
    const token = GetToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
