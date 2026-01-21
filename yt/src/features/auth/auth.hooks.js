import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  getCurrentUser,
  updateAccount,
  changePassword,
  updateAvatar,
  updateCoverImage,
  getChannelProfile,
  getWatchHistory,
} from "../../api/auth.api";

/* =========================
   GET CURRENT USER
========================= */
export const useCurrentUser = (options = {}) => {
  return useQuery({
    queryKey: ["auth", "currentUser"],
    queryFn: getCurrentUser,
    retry: false, // important for auth
    select: (res) => res.data.data,
    ...options,
  });
};

/* =========================
   REGISTER
========================= */
export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // refetch current user after register
      // Register response data IS the user object, not { user: ... }
      localStorage.setItem("user", JSON.stringify(data.data.data));
    },
    onError: (error) => {
      // clear auth cache on error
      localStorage.removeItem("user");
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
    onSuccess: (data) => {
      // refetch current user after login
      localStorage.setItem("user", JSON.stringify(data.data.data.user));
      queryClient.invalidateQueries({
        queryKey: ["auth", "currentUser"],
      });
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
      // clear auth cache on logout
      localStorage.removeItem("user");
      queryClient.removeQueries({
        queryKey: ["auth", "currentUser"],
      });
    },
  });
};

/* =========================
   REFRESH TOKEN
========================= */
export const useRefreshToken = () => {
  return useMutation({
    mutationFn: refreshToken,
  });
};

/* =========================
   UPDATE ACCOUNT DETAILS
========================= */
export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth", "currentUser"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "channelStats"],
      });
    },
  });
};

/* =========================
   CHANGE PASSWORD
========================= */
export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      // refetch current user after change password
      queryClient.invalidateQueries({
        queryKey: ["auth", "currentUser"],
      });
    },
  });
};

/* =========================
   UPDATE AVATAR
========================= */
export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth", "currentUser"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "channelStats"],
      });
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth", "currentUser"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "channelStats"],
      });
    },
  });
};

/* =========================
   CHANNEL PROFILE
========================= */
export const useChannelProfile = (username) => {
  return useQuery({
    queryKey: ["auth", "channel", username],
    queryFn: () => getChannelProfile(username),
    enabled: !!username,
    select: (res) => res.data.data,
  });
};

/* =========================
   WATCH HISTORY
========================= */
export const useWatchHistory = () => {
  return useQuery({
    queryKey: ["auth", "watchHistory"],
    queryFn: getWatchHistory,
    select: (res) => res.data.data,
  });
};
