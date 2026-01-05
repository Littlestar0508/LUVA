import { useNavigate } from "react-router-dom";
import useUserProfileStore from "../utils/UserProfileStore";
import { FaHeart } from "react-icons/fa";
import Logout from "./Logout";

function Mypage() {
  const profile_info = useUserProfileStore();
  const navigate = useNavigate();

  const moveToEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <>
      <div className="flex px-10 py-5 gap-5">
        <img src={profile_info.profile_img} className="w-20 rounded-full" />
        <div className="flex flex-col justify-around">
          <p className="text-luva-text-strong font-bold text-2xl">
            {profile_info.nickname}
          </p>
          <div className="flex gap-2 items-center">
            <FaHeart size={24} className="fill-luva-like" />
            <p className="text-2xl text-luva-text-strong">
              {profile_info.like}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-center text-lg py-4">
        <button
          className="flex-1 bg-luva-primary text-luva-text-strong p-2 font-bold rounded-xl"
          onClick={moveToEditProfile}
        >
          프로필 수정하기
        </button>
        <button
          className="flex-1 bg-luva-line text-luva-text-strong p-2 font-bold rounded-xl"
          onClick={() => console.log("주소 복사 성공!")}
        >
          프로필 공유
        </button>
      </div>
      <div className="flex flex-col gap-2 text-xl text-luva-text-strong">
        <p>취미 : {profile_info.hobby}</p>
        <p className="border-b">위치 : {profile_info.place}</p>
        <p>인증 계정</p>
        <p className="text-base border-b text-luva-text">
          {profile_info.email}
        </p>
        <p className="border-b">공지 사항</p>
        <Logout className="text-luva-warning text-start" />
        <p className="text-luva-danger">회원탈퇴</p>
      </div>
    </>
  );
}

export default Mypage;
