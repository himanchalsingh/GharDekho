import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://ghardekho-pslm.onrender.com/",
  withCredentials: true,
});

export default apiRequest;
