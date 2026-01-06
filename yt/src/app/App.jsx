import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

// pages
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Video from "../pages/Video";
import Channel from "../pages/Channel";
import Playlists from "../pages/Playlists";
import PlaylistDetails from "../pages/PlaylistDetails";
import Dashboard from "../pages/Dashboard";
import History from "../pages/History";
import LikedVideos from "../pages/LikedVideos";

const App = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/video/:videoId" element={<Video />} />
        <Route path="/channel/:username" element={<Channel />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlist/:playlistId" element={<PlaylistDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/liked-videos" element={<LikedVideos />} />
      </Route>
    </Routes>
  );
};

export default App;
