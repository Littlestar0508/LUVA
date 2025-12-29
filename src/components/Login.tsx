import GoogleLoginButton from "./GoogleLoginButton";
import KakaoLoginButton from "./KakaoLoginButton";

function Login() {
  return (
    <>
      <div className="flex flex-col gap-3">
        {/* 카카오 로그인 버튼 */}
        <KakaoLoginButton />

        <GoogleLoginButton />
      </div>
    </>
  );
}

export default Login;
