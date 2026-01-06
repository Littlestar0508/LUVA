import { useEffect } from "react";
import { supabase } from "../utils/SupabaseClient";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useUserProfileStore from "../utils/UserProfileStore";

function Home() {
  const user_profile = useUserProfileStore();

  const navigate = useNavigate();

  const moveToMyPage = () => {
    navigate("/mypage");
  };

  const moveToSearch = () => {
    navigate("/search");
  };

  useEffect(() => {
    console.log(user_profile.id);
    const getUserData = async () => {
      const { data, error } = await supabase.auth.getSession();
      const { data: user_info, error: user_info_error } = await supabase
        .from("user_info")
        .select()
        .eq("user_id", data.session?.user.id);

      if (error) throw error;
      if (user_info_error) throw user_info_error;

      const user = data.session?.user;
      const user_metadata = user?.user_metadata ?? {};

      const profile_path = `${user_info[0].profile_img}?v=${Date.now()}`;

      const profileImgURL =
        profile_path ??
        user_metadata.avatar_url ??
        user_metadata.picture ??
        null;

      const userNickname = user_info[0].nickname ?? user_metadata.full_name;

      user_profile.setHobby(user_info[0]?.hobby);
      user_profile.setPlace(user_info[0]?.place);
      user_profile.setLike(user_info[0]?.like);
      user_profile.setNickname(userNickname);
      user_profile.setProfileImg(profileImgURL);
      user_profile.setEmail(user_metadata.email);
      user_profile.setId(data.session?.user.id ?? "");
    };

    getUserData();
  }, []);

  // 임시 홈 페이지
  return (
    <>
      <div className="flex relative justify-center border-b pb-4">
        <img src="/luva-logo-text.svg" className="w-25" aria-label="LUVA" />
      </div>
      <div className="flex flex-col pt-4 items-center gap-2">
        {/* 프로필 이미지 */}
        <img
          src={user_profile.profile_img ?? "/basic_profile.png"}
          className="w-80 rounded-2xl"
        />
        {/* 닉네임 */}
        <p className="rounded-2xl text-2xl">{user_profile.nickname}</p>
        {/* 좋아요 수와 프로필 편집 버튼 container */}
        <div className="flex gap-2 w-80">
          <div className="flex items-center justify-center gap-4 bg-luva-line border-luva-line-soft border-2 rounded-lg p-4 flex-1">
            <FaHeart size={24} className="fill-luva-like" />
            {/* 더미 데이터 -> 이후 데이터 fetching예정 */}
            <p className="text-2xl">{user_profile.like ?? 0}</p>
          </div>
          <button
            className="flex justify-center items-center gap-4 bg-luva-line border-luva-line-soft border-2 rounded-lg p-4 flex-2 text-2xl"
            onClick={moveToMyPage}
          >
            프로필 편집
          </button>
        </div>
        {/* 둘러보기 페이지로 이동 */}
        <button
          className="bg-luva-like p-4 text-2xl w-80 rounded-2xl text-luva-text-strong"
          onClick={moveToSearch}
        >
          매칭 시작
        </button>
        {/* 자기소개 container */}
        <div className="bg-luva-line text-2xl w-80 p-4 rounded-2xl border-2 border-luva-line-soft">
          취미 : {user_profile.hobby ?? "설정하지 않음"}
          <br />
          위치 : {user_profile.place ?? "대한민국"}
        </div>
      </div>
    </>
  );
}

export default Home;
