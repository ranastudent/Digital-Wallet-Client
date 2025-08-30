import { Outlet } from "react-router-dom";

// No redirect, just allow public pages
const PublicRoute = () => {
  return <Outlet />;
};

export default PublicRoute;
