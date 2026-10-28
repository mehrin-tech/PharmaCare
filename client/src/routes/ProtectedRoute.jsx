
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();

  const { user, token, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  console.log("User:", user);
console.log("User role:", user?.role);
console.log("Token exists:", !!token);
console.log("Is authenticated:", isAuthenticated);
console.log("Allowed roles:", allowedRoles);
  // User login cheythittillenkil
  if (!token || !isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // User role check
  if (allowedRoles && !user?.role) {
    return (
      <Navigate to="/unauthorized" replace />
    );
  }

  // Unauthorized role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
