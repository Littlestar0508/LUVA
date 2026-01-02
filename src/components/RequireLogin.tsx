import type { JSX } from "react";
import useAuthStatus from "../utils/useAuthStatus";
import { Navigate, useLocation } from "react-router-dom";

// 로그인 되지 않은 상태로 내부를 관찰하려 할 때 로그인 페이지로 되돌리기
function RequireLogin({ children }: { children: JSX.Element }) {
  const { loading, isAuthed } = useAuthStatus();
  const location = useLocation();

  if (loading) return null;
  if (!isAuthed) {
    // 이후 로그인 완료가 되면 유저가 원하는 페이지로 이동하기 위한 state
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default RequireLogin;
