import { Navigate } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";
import type { JSX } from "react";

function LoginGuard({ children }: { children: JSX.Element }) {
  const { loading, isAuthed } = useAuthStatus();

  if (loading) return null;
  if (isAuthed) return <Navigate to="/" replace />;

  return children;
}

export default LoginGuard;
