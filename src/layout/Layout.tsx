import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Logout from "../components/Logout";

function Layout() {
  return (
    // 레이아웃 전체 틀
    <div className="relative mx-auto h-dvh w-full max-w-97.5 min-w-75 bg-luva-bg-0 overflow-hidden flex flex-col">
      {/* 스크롤은 main에서만 */}
      <main className="flex-1 overflow-y-auto px-4 py-3 pb-18 scrollbar-hide">
        <Logout />
        <Outlet />
      </main>

      {/* 항상 화면 하단에 보임 */}
      <Footer />
    </div>
  );
}

export default Layout;
