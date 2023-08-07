import axios from "axios";

export const api = axios.create({
  baseURL: "https://dev-movies-api.onrender.com",
  timeout: 8000,
});
