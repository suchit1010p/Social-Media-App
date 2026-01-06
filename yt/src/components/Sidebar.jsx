import { NavLink } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <NavLink to="/" end className="sidebar-link">
        Home
      </NavLink>

      <NavLink to="/playlists" className="sidebar-link">
        Playlists
      </NavLink>

      <NavLink to="/liked-videos" className="sidebar-link">
        Liked Videos
      </NavLink>

      <NavLink to="/history" className="sidebar-link">
        History
      </NavLink>

      <NavLink to="/dashboard" className="sidebar-link">
        Dashboard
      </NavLink>
    </aside>
  );
};

export default Sidebar;
