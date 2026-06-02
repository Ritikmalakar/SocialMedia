import axios from "axios";

export const baseUrl = axios.create({
  baseURL: import.meta.env.VITE_API_KEY + "/post",
  withCredentials: true,
});

export const baseUrl1 = axios.create({
  baseURL: import.meta.env.VITE_API_KEY + "/user",
  withCredentials: true,
});