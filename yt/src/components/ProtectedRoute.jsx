import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../features/auth/auth.hooks";

const ProtectedRoute = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
