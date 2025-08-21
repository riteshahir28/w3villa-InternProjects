import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // 👈 apne backend ka URL daalo
});

export default API;
