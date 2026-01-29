import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCurrentUser } from "../features/auth/auth.hooks";

const ProtectedRoute = () => {
  const location = useLocation();
  const { data: user, isLoading } = useCurrentUser();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        Loading...
      </div>
    );
  }

  // If no user after loading, redirect to login
  if (!user) {
    return (
      <Navigate to="/login" replace state={{ from: location.pathname }} />
    );
  }

  // User is authenticated, render protected content
  return <Outlet />;
};

export default ProtectedRoute;