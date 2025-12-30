import { supabase } from "../lib/SupabaseClient";

export default function GoogleLoginTest() {
  const loginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173",
      },
    });

    if (error) {
      console.error("Google login error:", error);
    } else {
      console.log("Redirecting to:", data.url);
    }
  };

  return <button onClick={loginWithGoogle}>Google 로그인 테스트</button>;
}
