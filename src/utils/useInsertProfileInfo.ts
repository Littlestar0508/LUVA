import { useEffect } from "react";
import { supabase } from "./SupabaseClient";

function useInsertProfileInfo() {
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event !== "SIGNED_IN") return;

      const user = session?.user;
      if (!user) return;

      const md = user.user_metadata ?? {};
      const profile_img = md.avatar_url ?? md.picture ?? null;
      const nickname =
        md.full_name ??
        md.name ??
        user.email?.split("@")[0] ??
        `LUVA${user.id.slice(0, 4)}`;

      const { data: existing, error: selectError } = await supabase
        .from("user_info")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      if (selectError) {
        console.error("user_info select error : ", selectError);
        return;
      }

      if (existing) return;

      const { error: insertError } = await supabase.from("user_info").insert({
        id: user.id,
        nickname,
        profile_img,
        hobby: "취미를 업데이트 해주세요",
        like: 0,
        place: "대한민국",
      });

      if (insertError) {
        console.error("user_info insert error : ", insertError);
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);
}

export default useInsertProfileInfo;
