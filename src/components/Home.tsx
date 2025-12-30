import { useEffect } from "react";
import { supabase } from "../lib/SupabaseClient";

function Home() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log(data);
    });
  });

  // 임시 홈 페이지
  return (
    <>
      <div className="bg-luva-like">홈페이지 영역입니다.</div>
    </>
  );
}

export default Home;
