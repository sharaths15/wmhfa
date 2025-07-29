import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../app/hooks/useAuth";

export const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
