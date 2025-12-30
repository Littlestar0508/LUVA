import { supabase } from "../lib/SupabaseClient";

// 로그아웃 버튼
function Logout() {
  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  };

  return (
    <>
      <button onClick={logOut}>로그아웃</button>
    </>
  );
}

export default Logout;
