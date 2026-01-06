import api from "./axios";

// Like / Unlike video
export const toggleVideoLike = (videoId) =>
  api.post(`/likes/video/${videoId}`);

// Like / Unlike comment
export const toggleCommentLike = (commentId) =>
  api.post(`/likes/comment/${commentId}`);

// Get liked videos
export const getLikedVideos = () =>
  api.get("/likes/videos");
