import { useEffect, useState } from "react";
import { supabase } from "../lib/SupabaseClient";
import { FaHeart } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Home() {
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const navigate = useNavigate();

  const moveToMyPage = () => {
    navigate("/mypage");
  };

  const moveToSearch = () => {
    navigate("/search");
  };

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
      <div className="flex relative justify-center border-b pb-4">
        <img src="../../public/luva-logo-text.svg" className="w-25" />
        <button
          aria-label="알림함"
          onClick={() => {
            alert("미구현 상태");
          }}
          className="absolute right-0"
        >
          <FaBell size={28} />
        </button>
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
            <p className="text-2xl">10</p>
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
          취미 : 더미데이터
          <br />
          위치 : 서울
          <br />
        </div>
      </div>
    </>
  );
}

export default Home;
