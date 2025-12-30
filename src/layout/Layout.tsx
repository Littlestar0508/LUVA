import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      {/* 모바일 앱 프레임 */}
      <div className="relative mx-auto min-h-dvh w-full max-w-97.5 min-w-75 bg-white">
        {/* 공통 헤더 */}
        {/* 페이지 영역 */}
        <main className="px-4 py-3 bg-white">
          <div className="bg-blue-500 h-200">ㅎㅇ</div>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
