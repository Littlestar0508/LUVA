import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import useAuthStatusStore from "../utils/AuthStatusStore";

// 로그인 이후에 뒤로가기 방지
function LoginGuard({ children }: { children: JSX.Element }) {
  const { isLoading, isLoggedIn } = useAuthStatusStore();

  if (isLoading) return null;
  if (isLoggedIn) return <Navigate to="/home" replace />;

  return children;
}

export default LoginGuard;
