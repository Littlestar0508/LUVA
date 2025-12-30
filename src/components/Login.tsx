import GoogleLoginButton from "./GoogleLoginButton";
import KakaoLoginButton from "./KakaoLoginButton";
import Logout from "./Logout";

function Login() {
  return (
    <>
      <div className="flex flex-col gap-3">
        {/* 카카오 로그인 버튼 */}
        <KakaoLoginButton />

        <GoogleLoginButton />
        <Logout />
      </div>
    </>
  );
}

export default Login;
