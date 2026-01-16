// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000/api/v1",
//   withCredentials: true, // REQUIRED for cookies
// });

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
});

export default api;
