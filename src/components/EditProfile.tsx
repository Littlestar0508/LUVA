import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useUserProfileStore from "../utils/UserProfileStore";

function EditProfile() {
  const user_profile = useUserProfileStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<string | ArrayBuffer | null>(
    user_profile.profile_img
  );

  // 파일 크기를 5MB로 제한하기 위한 함수
  const checkFileSize = (file: File) => {
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      toast("업로드 가능한 최대 크기는 5MB입니다.", {
        duration: 2000,
        icon: "⚠️",
      });
      return false;
    }

    return true;
  };

  // 이미지 변경 시 일어나는 이벤트
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 만약 전해진 파일이 없다면 return
    if (!checkFileSize(file)) {
      e.target.value = "";
      return;
    }

    // 이미지 URL 교체
    const reader = new FileReader();

    reader.onloadend = () => {
      setImg(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // 이미지 클릭 시 이벤트 일어나도록 설계
  const handleImgClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <form className="flex flex-col items-center gap-4">
        <input
          type="file"
          name="profile_img"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="sr-only"
        />
        <img
          src={img as string}
          className="rounded-full w-60"
          onClick={handleImgClick}
          alt="프로필 사진 변경"
        />
        <label className="w-4/5 text-luva-text-strong flex flex-col gap-1">
          닉네임 설정
          <input
            type="text"
            id="fix_nickname"
            className="border-luva-line border w-full rounded-xl p-1.5"
          ></input>
        </label>
        <label className="w-4/5 text-luva-text-strong flex flex-col gap-1">
          거주지역
          <input
            type="text"
            id="fix_place"
            className="border-luva-line border w-full rounded-xl p-1.5"
          ></input>
        </label>
        <label className="w-4/5 text-luva-text-strong flex flex-col gap-1">
          취미
          <input
            type="text"
            id="fix_hobby"
            className="border-luva-line border w-full rounded-xl p-1.5"
          ></input>
        </label>
        <Toaster position="bottom-center" />
      </form>
    </>
  );
}

export default EditProfile;
