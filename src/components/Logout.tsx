import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/SupabaseClient";

// 로그아웃 버튼
function Logout() {
  const navigate = useNavigate();

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);

    navigate("/login");
  };

  return (
    <>
      <button onClick={logOut} className="text-white">
        로그아웃
      </button>
    </>
  );
}

export default Logout;
