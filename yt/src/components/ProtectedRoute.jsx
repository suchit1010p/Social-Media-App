import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();
  const user = localStorage.getItem("user");

  // If no user in local storage, redirect immediately
  if (!user) {
    return (
      <Navigate to="/login" replace state={{ from: location.pathname }} />
    );
  }

  // User exists in local storage, render outlet
  return <Outlet />;
};

export default ProtectedRoute;
