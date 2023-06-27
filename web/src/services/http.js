import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:5002",
});

export default http;
