import { useEffect } from "react";
import { supabase } from "../utils/SupabaseClient";
import useAuthStatusStore from "./AuthStatusStore";

// 로그인 상태를 관리하는 custom hook
function useAuthStatus() {
  const { init, setInit, setIsLoggedIn, setIsLoading } = useAuthStatusStore();

  useEffect(() => {
    if (init) return;
    setInit(true);

    // 로그인 된 상태인지 체크
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) console.error(error);
      setIsLoggedIn(!!data.session);
      setIsLoading(false);
    });

    // 로그인/로그아웃 변화 관찰
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
        setIsLoading(false);
      }
    );

    // 이후 모든 처리가 마무리 되면 escape
    // 초기 상태로 되돌리기
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [init, setInit, setIsLoggedIn, setIsLoading]);
}

export default useAuthStatus;
