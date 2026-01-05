import { useNavigate } from "react-router-dom";

function Mypage() {
  const navigate = useNavigate();

  const moveToEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <>
      <div className="flex px-10 py-5 gap-5">
        <img src="/basic_profile.png" className="w-20 rounded-full" />
        <p>닉네임</p>
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
      <div className="flex flex-col gap-2 text-xl">
        <p>취미 : </p>
        <p className="border-b">위치 : </p>
        <p>인증 계정</p>
        <p className="text-base border-b">ㅁㄴㅇㄹ@ㅜㅁㅇㄹ.com</p>
        <p className="border-b">공지 사항</p>
        <p>로그 아웃</p>
        <p className="border-b">회원 탈퇴</p>
      </div>
    </>
  );
}

export default Mypage;
