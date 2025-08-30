import { Navigate } from "react-router-dom";
import { useAuth } from "@/redux/features/auth/AuthContext";

const DashboardRedirect = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // wait until auth state loads

  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;

  // Redirect to the layout route based on role
  switch (user.role) {
    case "admin":
      return <Navigate to="/admin" replace />;
    case "agent":
      return <Navigate to="/agent" replace />;
    default:
      return <Navigate to="/user" replace />;
  }
};

export default DashboardRedirect;
