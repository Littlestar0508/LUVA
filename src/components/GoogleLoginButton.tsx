import GoogleLoginTest from "./GoogleLoginTest";

function GoogleLoginButton() {
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
        onClick={() => console.log("google")}
      >
        Google로 시작하기
      </button>
      <GoogleLoginTest />
    </>
  );
}

export default GoogleLoginButton;
