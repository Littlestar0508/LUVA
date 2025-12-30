import KakaoLogo from "./KakaoLogo";

// 카카오톡 OAUTH 소셜 로그인, 미구현 상태
function KakaoLoginButton() {
  return (
    <button
      type="button"
      aria-label="카카오로 로그인"
      className="
          flex h-12 w-full items-center justify-center gap-2 
          rounded-xl bg-[#FEE500] text-sm font-semibold text-[#191919]
        "
      onClick={() => console.log("kakao")}
    >
      카카오로 시작하기
      <KakaoLogo className="h-5 w-5" />
    </button>
  );
}

export default KakaoLoginButton;
