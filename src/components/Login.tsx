import { useEffect } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import KakaoLoginButton from "./KakaoLoginButton";
import Logout from "./Logout";
import { supabase } from "../lib/SupabaseClient";

function Login() {
  const checkLogin = async () => {
    const { data } = await supabase.auth.getSession();

    console.log(data);
  };

  useEffect(() => {
    checkLogin();
  });

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
