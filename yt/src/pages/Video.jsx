import { useNavigate, useParams } from "react-router-dom";
import { useVideoById } from "../features/video/video.hooks";
import { useToggleVideoLike } from "../features/like/like.hooks";
import { useChannelProfile } from "../features/auth/auth.hooks";
import { useToggleSubscription } from "../features/subscription/subscription.hooks";
import CommentList from "../features/comment/CommentList";
import { useState } from "react";
import PlaylistModal from "../features/playlist/PlaylistModal";

import "./video.css";

const Video = () => {
  const { videoId } = useParams();

  const { data: video, isLoading, isError } = useVideoById(videoId);

  const [showPlaylist, setShowPlaylist] = useState(false);

  const navigate = useNavigate(); // ✅ FIX

  const likeMutation = useToggleVideoLike(videoId);

  const channelUsername = video?.owner?.username;
  const channelId = video?.owner?._id;

  const { data: channel } = useChannelProfile(channelUsername);

  const subscriptionMutation = useToggleSubscription(
    channelId,
    channelUsername
  );

  if (isLoading) return <h2>Loading video...</h2>;
  if (isError || !video) return <h2>Video not found</h2>;

  return (
    <div className="video-page">
      {/* VIDEO PLAYER */}
      <div className="video-player-wrapper">
        <video
          src={video.videoFile}
          controls
          autoPlay
          className="video-player"
        />
      </div>

      {/* VIDEO DETAILS */}
      <div className="video-details">
        <h2>{video.title}</h2>
        <p>{video.views || 0} views</p>

        {/* ACTION BUTTONS */}
        <div className="video-actions">
          <button
            className="like-btn"
            onClick={() => likeMutation.mutate()}
            disabled={likeMutation.isLoading}
          >
            {video.isLiked ? "Liked" : "Like"} {video.totalLikes}
          </button>

        </div>
      </div>

      {/* CHANNEL INFO */}
      {channel && (
        <div className="channel-box">
          <div
            className="channel-left"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/channel/${channel.username}`)}
          >
            <img
              src={channel.avatar}
              alt={channel.username}
              className="channel-avatar"
            />

            <div>
              <h4>{channel.fullName}</h4>
              <p>{channel.subscribersCount} subscribers</p>
            </div>
          </div>

          <button
            className={`subscribe-btn ${
              channel.isSubscribed ? "subscribed" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation(); // ✅ IMPORTANT
              subscriptionMutation.mutate();
            }}
            disabled={subscriptionMutation.isLoading}
          >
            {channel.isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>
      )}


      {/* COMMENTS SECTION */}
      <CommentList videoId={videoId} />

      <button onClick={() => setShowPlaylist(true)}>
            ➕ Save
          </button>

          {showPlaylist && (
            <PlaylistModal
              videoId={video._id}
              onClose={() => setShowPlaylist(false)}
            />
          )}

    </div>
  );
};

export default Video;
