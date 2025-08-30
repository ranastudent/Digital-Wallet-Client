import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/redux/features/auth/AuthContext";

interface Props {
  roles?: ("user" | "agent" | "admin")[];
}

const PrivateRoute = ({ roles }: Props) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Show loader while auth state is initializing
  if (loading) return <p>Loading...</p>;

  // Redirect if not logged in
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Redirect if role is not allowed
  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Render protected routes
  return <Outlet />;
};

export default PrivateRoute;
