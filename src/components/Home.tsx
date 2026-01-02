import { useEffect, useState } from "react";
import { supabase } from "../utils/SupabaseClient";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Home() {
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [hobby, setHobby] = useState<string | null>(null);
  const [like, setLike] = useState<number | null>(null);
  const [place, setPlace] = useState<string | null>(null);
  const navigate = useNavigate();

  const moveToMyPage = () => {
    navigate("/mypage");
  };

  const moveToSearch = () => {
    navigate("/search");
  };

  useEffect(() => {
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

      const profileImgURL =
        user_info[0].profile_img ??
        user_metadata.avatar_url ??
        user_metadata.picture ??
        null;

      const userNickname = user_info[0].nickname ?? user_metadata.full_name;

      setHobby(user_info[0].hobby);
      setLike(user_info[0].like);
      setProfileImg(profileImgURL);
      setNickname(userNickname);
      setPlace(user_info[0].place);
    };

    getUserData();
  });

  // 임시 홈 페이지
  return (
    <>
      <div className="flex relative justify-center border-b pb-4">
        <img
          src="/public/luva-logo-text.svg"
          className="w-25"
          aria-label="LUVA"
        />
      </div>
      <div className="flex flex-col pt-4 items-center gap-2">
        {/* 프로필 이미지 */}
        <img
          src={profileImg ?? "../../public/basic_profile.png"}
          className="w-80 rounded-2xl"
        />
        {/* 닉네임 */}
        <p className="rounded-2xl text-2xl">{nickname}</p>
        {/* 좋아요 수와 프로필 편집 버튼 container */}
        <div className="flex gap-2 w-80">
          <div className="flex items-center justify-center gap-4 bg-luva-line border-luva-line-soft border-2 rounded-lg p-4 flex-1">
            <FaHeart size={24} className="fill-luva-like" />
            {/* 더미 데이터 -> 이후 데이터 fetching예정 */}
            <p className="text-2xl">{like ?? 0}</p>
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
          취미 : {hobby ?? "설정하지 않음"}
          <br />
          위치 : {place ?? "대한민국"}
        </div>
      </div>
    </>
  );
}

export default Home;
