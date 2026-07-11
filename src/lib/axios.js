import axios from "axios";

const api = axios.create({
  baseURL: process.env.BETTER_AUTH_URL,
  withCredentials: true,
});

export default api;