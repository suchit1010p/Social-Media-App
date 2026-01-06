import api from "./axios";

// Add comment to video
export const addComment = (videoId, data) =>
  api.post(`/comments/${videoId}`, data);

// Get comments by video
export const getCommentsByVideo = (videoId) =>
  api.get(`/comments/${videoId}`);

// Update comment
export const updateComment = (commentId, data) =>
  api.patch(`/comments/${commentId}`, data);

// Delete comment
export const deleteComment = (commentId) =>
  api.delete(`/comments/${commentId}`);
