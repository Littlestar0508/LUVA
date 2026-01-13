import { useEffect } from "react";
import { supabase } from "../utils/SupabaseClient";
import useAuthStatusStore from "./AuthStatusStore";

function useAuthStatus() {
  const { setIsLoggedIn, setIsLoading } = useAuthStatusStore();

  useEffect(() => {
    let mounted = true;

    setIsLoading(true);

    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;
      if (error) console.error(error);
      setIsLoggedIn(!!data.session);
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;
        setIsLoggedIn(!!session);
        setIsLoading(false);
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [setIsLoggedIn, setIsLoading]);
}

export default useAuthStatus;
