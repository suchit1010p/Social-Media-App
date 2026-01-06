import api from "./axios";

// Get dashboard statistics
export const getDashboardStats = () =>
  api.get("/dashboard");