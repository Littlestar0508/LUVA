import { IoHomeSharp } from "react-icons/io5";
import { IoChatbox } from "react-icons/io5";
import { IoHeartCircle } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

type Pathname = "/home" | "/chat" | "/search" | "/mypage";

function Footer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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

  const isActive = (path: Pathname) => pathname === path;

  return (
    <footer className="h-18 bg-luva-bg-0 border-t border-luva-line flex items-center justify-around">
      <button
        aria-label="홈으로 이동"
        onClick={moveToHome}
        className="flex items-center justify-center w-10 h-10"
      >
        <IoHomeSharp
          className={
            isActive("/chat") || isActive("/search") || isActive("/mypage")
              ? "text-luva-text-sub"
              : "text-luva-primary"
          }
          size={24}
          stroke="2px"
        />
      </button>
      <button
        aria-label="채팅창으로 이동"
        onClick={moveToChat}
        className="flex items-center justify-center w-10 h-10"
      >
        <IoChatbox
          className={
            isActive("/chat") ? "text-luva-primary" : "text-luva-text-sub"
          }
          size={24}
          stroke="2px"
        />
      </button>
      <button
        aria-label="둘러보기로 이동"
        onClick={moveToSearch}
        className="flex items-center justify-center w-10 h-10"
      >
        <IoHeartCircle
          className={
            isActive("/search") ? "text-luva-primary" : "text-luva-text-sub"
          }
          size={24}
          stroke="2px"
        />
      </button>
      <button
        aria-label="마이페이지로 이동"
        onClick={moveToMypage}
        className="flex items-center justify-center w-10 h-10"
      >
        <IoMdMenu
          className={
            isActive("/mypage") ? "text-luva-primary" : "text-luva-text-sub"
          }
          size={24}
          stroke="2px"
        />
      </button>
    </footer>
  );
}

export default Footer;
