import api from "./axios";

// Channel subscribers
export const getChannelSubscribers = (channelId) =>
  api.get(`/subscriptions/channel/${channelId}`);

// Subscribed channels
export const getSubscribedChannels = (userId) =>
  api.get(`/subscriptions/user/${userId}`);

// Toggle subscription
export const toggleSubscription = (channelId) =>
  api.post(`/subscriptions/toggle/${channelId}`);

// Dashboard stats
export const getChannelStats = () =>
  api.get("/dashboard");
