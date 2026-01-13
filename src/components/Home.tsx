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
    if (user_profile.id) return;

    const getUserData = async () => {
      const { data, error } = await supabase.auth.getSession();
      const { data: user_info, error: user_info_error } = await supabase
        .from("user_info")
        .select()
        .eq("user_id", data.session?.user.id)
        .maybeSingle();

      if (error) throw error;
      if (user_info_error) {
        user_profile.setHobby("취미를 설정해주세요.");
        user_profile.setPlace("위치를 설정해주세요.");
        user_profile.setNickname("LUVA");
        user_profile.setProfileImg("/basic_profile.png");

        await supabase.from("user_info").insert([
          {
            user_id: data.session?.user.id,
            nickname: "LUVA",
            profile_img: `https://yyrwpekhbevmaigheerf.supabase.co/storage/v1/object/public/profile_img/${data.session?.user.id}.png`,
            hobby: "취미를 설정해주세요.",
            like: 0,
            place: "위치를 설정해주세요.",
          },
        ]);
      }

      const user = data.session?.user;
      const user_metadata = user?.user_metadata ?? {};

      const profile_path = `${user_info.profile_img}?v=${Date.now()}`;

      const profileImgURL =
        profile_path ??
        user_metadata.avatar_url ??
        user_metadata.picture ??
        null;

      const userNickname = user_info.nickname ?? user_metadata.full_name;

      user_profile.setHobby(user_info?.hobby);
      user_profile.setPlace(user_info?.place);
      user_profile.setNickname(userNickname);
      user_profile.setProfileImg(profileImgURL);
      user_profile.setEmail(user_metadata.email);
      user_profile.setId(data.session?.user.id ?? "");
    };
    const getUserLike = async () => {
      const { data, error } = await supabase.rpc("get_my_like_ids");

      if (error) {
        user_profile.setLike(0);
      }

      user_profile.setLike(data.incoming.length);
    };

    getUserData();
    getUserLike();
  }, []);

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
