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
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      // Optional: Redirect to login if needed, or let React components handle it
      // window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default api;
