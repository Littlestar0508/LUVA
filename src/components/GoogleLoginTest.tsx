import { supabase } from "../lib/SupabaseClient";

// 구글 OAUTH 소셜 로그인 현재는 localhost 테스트를 위한 코드
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

  return (
    <button onClick={loginWithGoogle} className="text-white">
      Google 로그인 테스트
    </button>
  );
}
