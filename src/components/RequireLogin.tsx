import type { JSX } from "react";
import useAuthStatus from "../hooks/useAuthStatus";
import { Navigate, useLocation } from "react-router-dom";

function RequireLogin({ children }: { children: JSX.Element }) {
  const { loading, isAuthed } = useAuthStatus();
  const location = useLocation();

  if (loading) return null;
  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default RequireLogin;
