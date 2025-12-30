import { useEffect, useState } from "react";
import { supabase } from "../lib/SupabaseClient";

// 로그인 상태를 관리하는 custom hook
function useAuthStatus() {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    // 1회만 확인하기 위한 장치
    let chk = true;

    // 로그인 된 상태인지 체크
    supabase.auth.getSession().then(({ data, error }) => {
      if (!chk) return;
      if (error) console.error(error);
      setIsAuthed(!!data.session);
      setLoading(false);
    });

    // 로그인, 로그아웃으로 인한 authentication 변화 관찰
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!chk) return;
        setIsAuthed(!!session);
        setLoading(false);
      }
    );

    // 이후 모든 처리가 마무리 되면 escape
    // 초기 상태로 되돌리기
    return () => {
      chk = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return { loading, isAuthed };
}

export default useAuthStatus;
