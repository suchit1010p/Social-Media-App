// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useCurrentUser } from "../features/auth/auth.hooks";

// const ProtectedRoute = () => {
//   const location = useLocation();
//   const { data: user, isLoading } = useCurrentUser();

//   // Show loading state while checking authentication
//   if (isLoading) {
//     return (
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh'
//       }}>
//         Loading...
//       </div>
//     );
//   }

//   // If no user after loading, redirect to login
//   if (!user) {
//     return (
//       <Navigate to="/login" replace state={{ from: location.pathname }} />
//     );
//   }

//   // User is authenticated, render protected content
//   return <Outlet />;
// };

// export default ProtectedRoute;



import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCurrentUser } from "../features/auth/auth.hooks";
import { authStorage } from "../utils/authStorage";

const ProtectedRoute = () => {
  const location = useLocation();
  
  // Check localStorage first - instant check, no API call
  const hasToken = !!authStorage.getAccessToken();
  
  // Only fetch if we have a token
  const { data: user, isLoading, isError } = useCurrentUser({
    enabled: hasToken, // Don't call API if no token exists
    retry: false, // Don't retry on 401 - just redirect
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Instant redirect if no token - no loading state needed
  if (!hasToken) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Show loading only if we're validating the token
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Verifying session...
      </div>
    );
  }

  // If error or no user after loading with valid token, clear and redirect
  if (isError || !user) {
    authStorage.clearAuth();
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // User is authenticated, render protected content
  return <Outlet />;
};

export default ProtectedRoute;
