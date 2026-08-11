import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem("jwt-token") ? true : false;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
