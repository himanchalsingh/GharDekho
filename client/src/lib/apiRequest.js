import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://ghardekho-pslm.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;
