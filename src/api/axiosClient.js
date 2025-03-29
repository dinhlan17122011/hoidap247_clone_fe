import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api", // Thay bằng URL thực tế của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
