import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAllVideos } from "../features/video/video.hooks";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortType, setSortType] = useState("desc");

  const { data, isLoading, isError } = useAllVideos({
    page,
    limit: 8,
    query: searchQuery || undefined,
    sortBy,
    sortType,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setSearchQuery(searchInput);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchInput]);

  if (isLoading) {
    return <h2>Loading videos...</h2>;
  }

  if (isError) {
    return <h2>Failed to load videos</h2>;
  }

  const {
    videos = [],
    totalPages = 1,
    currentPage = 1,
  } = data || {};

  return (
    <div className="home">
      {/* SEARCH & SORT BAR */}
      <div className="home-controls">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />


        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="createdAt">Newest</option>
          <option value="views">Most Viewed</option>
          <option value="title">Title</option>
        </select>

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {/* VIDEO GRID */}
      <div className="video-grid">
        {videos.length === 0 && (
          <p>No videos found</p>
        )}

        {videos.map((video) => (
          <div
            key={video._id}
            className="video-card"
            onClick={() => navigate(`/video/${video._id}`)}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="video-thumbnail"
            />

            <div className="video-info">
              <h4>{video.title}</h4>
              <p>{video.views || 0} views</p>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
