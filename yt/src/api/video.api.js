import api from "./axios";

// Get all videos (home feed)
export const getAllVideos = ({
  page = 1,
  limit = 10,
  query,
  sortBy = "createdAt",
  sortType = "desc",
  userId,
}) => {
  return api.get("/videos", {
    params: {
      page,
      limit,
      query,
      sortBy,
      sortType,
      userId,
    },
  });
};

// Publish video
export const publishVideo = (formData) =>
  api.post("/videos/publishVideo", formData);

// Get video by ID
export const getVideoById = (videoId) =>
  api.get(`/videos/${videoId}`);

// Update video details
export const updateVideoDetails = (videoId, data) =>
  api.patch(`/videos/${videoId}`, data);

// Delete video
export const deleteVideo = (videoId) =>
  api.delete(`/videos/${videoId}`);
