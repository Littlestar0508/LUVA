import { supabase } from "../utils/SupabaseClient";

// 구글 로그인 버튼, 테스트 구현
function GoogleLoginButton() {
  const loginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://luvaa.vercel.app",
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
      <img
        src="/luva-logo-text.svg"
        alt="LUVA 로고"
        className="size-60 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-2/3"
      />
      <button
        type="button"
        aria-label="구글로 로그인"
        className="
            h-12 w-89.5
            rounded-xl border border-gray-200 bg-white
            text-base font-semibold text-gray-900 absolute bottom-10
          "
        onClick={loginWithGoogle}
      >
        Google로 시작하기
      </button>
    </>
  );
}

export default GoogleLoginButton;
