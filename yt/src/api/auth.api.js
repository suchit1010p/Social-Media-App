import api from "./axios";

// Register
export const registerUser = (formData) =>
  api.post("/users/register", formData);

// Login
export const loginUser = (data) =>
  api.post("/users/login", data);

// Logout
export const logoutUser = () =>
  api.post("/users/logout");

// Refresh token
export const refreshToken = () =>
  api.post("/users/refresh-token");

// Current user
export const getCurrentUser = () =>
  api.get("/users/current-user");

// Change password
export const changePassword = (data) =>
  api.post("/users/change-password", data);

// Update account details
export const updateAccountDetails = (data) =>
  api.patch("/users/update-account", data);

// Update avatar
export const updateAvatar = (formData) =>
  api.patch("/users/avatar", formData);

// Update cover image
export const updateCoverImage = (formData) =>
  api.patch("/users/cover-image", formData);

// Get user by username (channel)
export const getUserByUsername = (username) =>
  api.get(`/users/c/${username}`);

// Watch history
export const getWatchHistory = () =>
  api.get("/users/history");
