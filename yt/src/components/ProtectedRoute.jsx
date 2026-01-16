import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getLocalUser } from "../utils/auth.utils";

const ProtectedRoute = () => {
  const user = getLocalUser();
  const location = useLocation();

  // If no local token, redirect immediately
  if (!user) {
    return (
      <Navigate to="/login" replace state={{ from: location.pathname }} />
    );
  }

  // Allow rendering immediately
  return <Outlet />;
};

export default ProtectedRoute;
