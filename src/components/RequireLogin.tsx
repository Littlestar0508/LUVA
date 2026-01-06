import useAuthStatusStore from "../utils/AuthStatusStore";
import { Navigate, Outlet } from "react-router-dom";

function RequireLogin() {
  const { isLoading, isLoggedIn } = useAuthStatusStore();

  if (isLoading) return null;
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default RequireLogin;
