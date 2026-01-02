import { supabase } from "../utils/SupabaseClient";

// 구글 로그인 버튼, 테스트 구현
function GoogleLoginButton() {
  const loginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://luvaa.vercel.app/home",
      },
    });

    if (error) {
      console.error("Google login error:", error);
    } else {
      console.log("Redirecting to:", data.url);
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="구글로 로그인"
        className="
            flex h-12 w-full items-center justify-center gap-2
            rounded-xl border border-gray-200 bg-white
            text-sm font-semibold text-gray-900
          "
        onClick={loginWithGoogle}
      >
        Google로 시작하기
      </button>
    </>
  );
}

export default GoogleLoginButton;
