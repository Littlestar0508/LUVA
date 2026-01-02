import { useEffect, useState } from "react";
import { supabase } from "../lib/SupabaseClient";
import { FaHeart } from "react-icons/fa";
import { FaBell } from "react-icons/fa";

function Home() {
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    const getProfileImgURL = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) throw error;

      const user = data.session?.user;
      const user_metadata = user?.user_metadata ?? {};

      const profileImgURL =
        user_metadata.avatar_url ?? user_metadata.picture ?? null;

      console.log(user_metadata);
      setProfileImg(profileImgURL);
      setNickname(user_metadata.full_name);
    };

    getProfileImgURL();
  });

  // 임시 홈 페이지
  return (
    <>
      <div>
        <img src="../../public/luva-logo-shape.svg" />
        <img src="../../public/luva-logo-text.svg" className="w-20" />
        <FaBell />
      </div>
      <div className="flex flex=col">
        <img src={profileImg ?? "../../public/basic_profile.png"}></img>
        <p>{nickname}</p>
        <FaHeart />
      </div>
    </>
  );
}

export default Home;
