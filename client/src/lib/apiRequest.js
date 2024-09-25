import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:8800/api",
  withCredentials: true,
});

export default apiRequest;

// import axios from "axios";

// const apiRequest = axios.create({
//   baseURL:
//     process.env.NODE_ENV === "development"
//       ? "/api"
//       : "http://your-production-url.com/api",
//   withCredentials: true,
// });

// export default apiRequest;
