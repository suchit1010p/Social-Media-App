import api from "./axios";

// Create playlist
export const createPlaylist = (data) =>
  api.post("/playlists", data);

// Get all playlists of user
export const getUserPlaylists = () =>
  api.get("/playlists");

// Get playlist by ID
export const getPlaylistById = (playlistId) =>
  api.get(`/playlists/${playlistId}`);

// Add video to playlist
export const addVideoToPlaylist = (playlistId, videoId) =>
  api.post(`/playlists/${playlistId}/videos/${videoId}`);

// Remove video from playlist
export const removeVideoFromPlaylist = (playlistId, videoId) =>
  api.delete(`/playlists/${playlistId}/videos/${videoId}`);

// Update playlist
export const updatePlaylist = (playlistId, data) =>
  api.patch(`/playlists/${playlistId}`, data);

// Delete playlist
export const deletePlaylist = (playlistId) =>
  api.delete(`/playlists/${playlistId}`);
