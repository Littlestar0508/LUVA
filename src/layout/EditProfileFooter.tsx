import { useNavigate } from "react-router-dom";

type EditProfileFooterProps = React.ComponentProps<"button">;

function EditProfileFooter({ onClick }: EditProfileFooterProps) {
  const navigate = useNavigate();

  const handleClickCancel = () => {
    navigate("/mypage");
  };

  return (
    <footer className="h-18 bg-luva-bg-0 border-t border-luva-line flex items-center justify-around">
      <button
        className="flex-1 h-full border-r border-luva-line bg-luva-success text-luva-bg-0 font-bold"
        type="submit"
        form="edit-profile-form"
      >
        수정
      </button>
      <button
        className="flex-1 h-full bg-luva-danger text-luva-text-strong font-bold"
        onClick={handleClickCancel}
      >
        취소
      </button>
    </footer>
  );
}

export default EditProfileFooter;
