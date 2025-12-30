// useAuthStatus.ts
import { useEffect, useState } from "react";
import { supabase } from "../lib/SupabaseClient";

function useAuthStatus() {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;

    // 1) 최초 1회 세션 확인
    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;
      if (error) console.error(error);
      setIsAuthed(!!data.session);
      setLoading(false);
    });

    // 2) 이후 로그인/로그아웃 이벤트 반영
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;
        setIsAuthed(!!session);
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return { loading, isAuthed };
}

export default useAuthStatus;
