import { IoHomeSharp } from "react-icons/io5";
import { IoChatbox } from "react-icons/io5";
import { IoHeartCircle } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const moveToHome = () => {
    navigate("/home");
  };

  const moveToChat = () => {
    navigate("/chat");
  };

  const moveToSearch = () => {
    navigate("/search");
  };

  const moveToMypage = () => {
    navigate("/mypage");
  };

  return (
    <footer className="flex justify-around items-center h-18 bg-luva-bg-0 sticky bottom-0 right-0 left-0 border-t border-luva-line">
      <button aria-label="홈으로 이동" onClick={moveToHome}>
        <IoHomeSharp color="#8F97AD" size={24} stroke="2px" />
      </button>
      <button aria-label="채팅창으로 이동" onClick={moveToChat}>
        <IoChatbox color="#8F97AD" size={24} stroke="2px" />
      </button>
      <button aria-label="둘러보기로 이동" onClick={moveToSearch}>
        <IoHeartCircle color="#8F97AD" size={24} stroke="2px" />
      </button>
      <button aria-label="마이페이지로 이동" onClick={moveToMypage}>
        <IoMdMenu color="#8F97AD" size={24} stroke="2px" />
      </button>
    </footer>
  );
}

export default Footer;
