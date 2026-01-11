import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../features/auth/auth.hooks";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate("/login", { replace: true });
      },
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          VidPlay
        </Link>
      </div>

      <div className="navbar-right">
        <button
          className="logout-btn"
          onClick={handleLogout}
          disabled={logoutMutation.isLoading}
        >
          {logoutMutation.isLoading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

