import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateAccount,
  changePassword,
  updateAvatar,
  updateCoverImage,
  getChannelProfile,
  getWatchHistory,
} from "../../api/auth.api";
import { authStorage } from "../../utils/authStorage";

// Query Keys - Centralized for consistency
export const authKeys = {
  currentUser: ["auth", "currentUser"],
  channel: (username) => ["auth", "channel", username],
  watchHistory: ["auth", "watchHistory"],
};

/* =========================
   GET CURRENT USER
========================= */
export const useCurrentUser = (options = {}) => {
  return useQuery({
    queryKey: authKeys.currentUser,
    queryFn: getCurrentUser,
    retry: (failureCount, error) => {
      // Don't retry on auth errors (401, 403)
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      // Retry on network errors up to 2 times
      return failureCount < 2;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - reduce unnecessary refetches
    select: (res) => res.data.data,
    ...options,
  });
};

/* =========================
   REGISTER
========================= */
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (response) => {
      // Normalize response data structure
      const userData = response.data.data;
      const accessToken = userData.accessToken || response.data.data.accessToken;

      // Update storage
      authStorage.setUser(userData.user || userData);
      if (accessToken) {
        authStorage.setAccessToken(accessToken);
      }

      // Update query cache
      queryClient.setQueryData(authKeys.currentUser, response);
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      authStorage.clearAuth();
      queryClient.setQueryData(authKeys.currentUser, null);
    },
  });
};

/* =========================
   LOGIN
========================= */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      const { user, accessToken, refreshToken } = response.data.data;

      // Update storage
      authStorage.setUser(user);
      authStorage.setAccessToken(accessToken);

      // Update query cache with full response for select to work
      queryClient.setQueryData(authKeys.currentUser, {
        data: { data: user }
      });
    },
    onError: (error) => {
      console.error("Login failed:", error);
      authStorage.clearAuth();
    },
  });
};

/* =========================
   LOGOUT
========================= */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // Clear storage
      authStorage.clearAuth();

      // Clear specific auth queries, not all queries
      queryClient.setQueryData(authKeys.currentUser, null);
      queryClient.invalidateQueries({ queryKey: ["auth"] });

      // Optionally clear all queries if needed for fresh start
      // queryClient.clear();
    },
    onError: (error) => {
      // Even if logout fails on server, clear local state
      console.error("Logout failed on server, clearing local state:", error);
      authStorage.clearAuth();
      queryClient.setQueryData(authKeys.currentUser, null);
    },
  });
};

/* =========================
   UPDATE ACCOUNT DETAILS
========================= */
export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAccount,
    onMutate: async (newData) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: authKeys.currentUser });

      // Snapshot previous value
      const previousUser = queryClient.getQueryData(authKeys.currentUser);

      // Optimistically update
      if (previousUser) {
        queryClient.setQueryData(authKeys.currentUser, (old) => ({
          ...old,
          data: {
            ...old.data,
            data: {
              ...old.data.data,
              ...newData
            }
          }
        }));
      }

      return { previousUser };
    },
    onError: (err, newData, context) => {
      // Rollback on error
      if (context?.previousUser) {
        queryClient.setQueryData(authKeys.currentUser, context.previousUser);
      }
    },
    onSettled: () => {
      // Refetch to ensure sync
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "channelStats"] });
    },
  });
};

/* =========================
   CHANGE PASSWORD
========================= */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    // No need to invalidate queries for password change
    // User data doesn't change
  });
};

/* =========================
   UPDATE AVATAR
========================= */
export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAvatar,
    onSuccess: (response) => {
      const newAvatar = response.data.data.avatar;

      // Optimistically update current user query
      queryClient.setQueryData(authKeys.currentUser, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            data: {
              ...old.data.data,
              avatar: newAvatar
            }
          }
        };
      });

      // Update dashboard stats
      queryClient.invalidateQueries({ queryKey: ["dashboard", "channelStats"] });
    },
  });
};

/* =========================
   UPDATE COVER IMAGE
========================= */
export const useUpdateCoverImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCoverImage,
    onSuccess: (response) => {
      const newCoverImage = response.data.data.coverImage;

      // Optimistically update current user query
      queryClient.setQueryData(authKeys.currentUser, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            data: {
              ...old.data.data,
              coverImage: newCoverImage
            }
          }
        };
      });

      // Update dashboard stats
      queryClient.invalidateQueries({ queryKey: ["dashboard", "channelStats"] });
    },
  });
};

/* =========================
   CHANNEL PROFILE
========================= */
export const useChannelProfile = (username) => {
  return useQuery({
    queryKey: authKeys.channel(username),
    queryFn: () => getChannelProfile(username),
    enabled: !!username,
    staleTime: 2 * 60 * 1000, // 2 minutes
    select: (res) => res.data.data,
  });
};

/* =========================
   WATCH HISTORY
========================= */
export const useWatchHistory = () => {
  return useQuery({
    queryKey: authKeys.watchHistory,
    queryFn: getWatchHistory,
    staleTime: 1 * 60 * 1000, // 1 minute
    select: (res) => res.data.data,
  });
};