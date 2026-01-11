import { useNavigate } from "react-router-dom";
import { useUserPlaylists } from "../features/playlist/playlist.hooks";
import "./playlists.css";

const Playlists = () => {
  const navigate = useNavigate();
  const { data: playlists = [], isLoading } = useUserPlaylists();

  if (isLoading) return <h2>Loading playlists...</h2>;

  return (
    <div className="playlists-page">
      <h2>Your Playlists</h2>

      {playlists.length === 0 && (
        <p>You haven’t created any playlists yet.</p>
      )}

      <div className="playlists-grid">
        {playlists.map((playlist) => {
          const latestVideo =
            playlist.videos?.[playlist.videos.length - 1];

          return (
            <div
              key={playlist._id}
              className="playlist-card"
              onClick={() => navigate(`/playlists/${playlist._id}`)}
            >
              {/* THUMBNAIL WITH SUBTLE STACK */}
              <div className="playlist-thumb-wrapper">
                <div className="playlist-shadow shadow-1" />
                <div className="playlist-shadow shadow-2" />

                <div className="playlist-thumb">
                  {latestVideo ? (
                    <img
                      src={latestVideo.thumbnail}
                      alt={playlist.name}
                    />
                  ) : (
                    <div className="empty-thumb">No videos</div>
                  )}

                  {playlist.videos?.length > 0 && (
                    <span className="playlist-count">
                      {playlist.videos.length} videos
                    </span>
                  )}
                </div>
              </div>

              {/* INFO */}
              <div className="playlist-info">
                <h4>{playlist.name}</h4>
                <p>{playlist.videos?.length || 0} videos</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Playlists;
