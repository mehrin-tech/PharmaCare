import { Navigate, Outlet } from "react-router-dom";

const RoleBasedRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    switch (user.role) {
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;

      case "pharmacy":
        return <Navigate to="/pharmacy/dashboard" replace />;

      case "customer":
        return <Navigate to="/" replace />;

      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <Outlet />;
};

export default RoleBasedRoute;