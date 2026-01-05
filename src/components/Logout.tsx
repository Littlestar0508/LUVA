import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/SupabaseClient";

type LogoutProps = React.ComponentProps<"button">;

// 로그아웃 버튼
function Logout({ className }: LogoutProps) {
  const navigate = useNavigate();

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);

    navigate("/login");
  };

  return (
    <>
      <button onClick={logOut} className={className}>
        로그아웃
      </button>
    </>
  );
}

export default Logout;
