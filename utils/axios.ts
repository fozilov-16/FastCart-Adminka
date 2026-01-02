import axios from "axios";
import { api } from "../src/reducers/api";

export const SaveToken = (token: string) => {
  localStorage.setItem("authToken", token);
};

export const GetToken = () => {
  return localStorage.getItem("authToken");
};

export const axiosRequest = axios.create({
  baseURL: api,
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
