import { useParams, useNavigate } from "react-router-dom";
import {
  usePlaylistById,
  useRemoveVideoFromPlaylist,
} from "../features/playlist/playlist.hooks";
import { useCurrentUser } from "../features/auth/auth.hooks";
import "./playlist.css";

const Playlist = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();

  const { data: playlist, isLoading, isError } = usePlaylistById(playlistId);
  const removeVideo = useRemoveVideoFromPlaylist();
  const { data: currentUser } = useCurrentUser();

  if (isLoading) return <h2>Loading playlist...</h2>;
  if (isError || !playlist) return <h2>Playlist not found</h2>;

  const isOwner = currentUser?._id === playlist.owner;

  const handleRemove = (videoId) => {
    removeVideo.mutate({ playlistId, videoId });
  };

  return (
    <div className="playlist-page">
      {/* HEADER */}
      <div className="playlist-header">
        <h2>{playlist.name}</h2>
        {playlist.description && <p>{playlist.description}</p>}
        <p>{playlist.videos.length} videos</p>
      </div>

      {/* VIDEOS */}
      <div className="playlist-videos">
        {playlist.videos.length === 0 && (
          <p>No videos in this playlist</p>
        )}

        {playlist.videos.map((video) => (
          <div key={video._id} className="playlist-video-card">
            <img
              src={video.thumbnail}
              alt={video.title}
              onClick={() => navigate(`/video/${video._id}`)}
            />

            <div
              className="playlist-video-info"
              onClick={() => navigate(`/video/${video._id}`)}
            >
              <h4>{video.title}</h4>
              <p>{video.duration?.toFixed(0)} sec</p>
            </div>

            {isOwner && (
              <button
                className="remove-btn"
                onClick={() => handleRemove(video._id)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
