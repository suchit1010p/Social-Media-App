import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCurrentUser } from "../features/auth/auth.hooks";

const ProtectedRoute = () => {
  const { data: user, isLoading, isError } = useCurrentUser();
  const location = useLocation();

  // While checking auth status
  if (isLoading) {
    return <div>Checking authentication...</div>;
  }

  // If not logged in OR token invalid
  if (isError || !user) {
    return (
      <Navigate to="/login" replace state={{ from: location.pathname }} />
    );
  }

  // User is authenticated
  return <Outlet />;
};

export default ProtectedRoute;
