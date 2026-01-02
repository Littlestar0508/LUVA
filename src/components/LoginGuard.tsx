import { Navigate } from "react-router-dom";
import useAuthStatus from "../utils/useAuthStatus";
import type { JSX } from "react";

// 로그인 이후에 뒤로가기 방지
function LoginGuard({ children }: { children: JSX.Element }) {
  const { loading, isAuthed } = useAuthStatus();

  if (loading) return null;
  if (isAuthed) return <Navigate to="/" replace />;

  return children;
}

export default LoginGuard;
