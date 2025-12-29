import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      {/* 모바일 앱 프레임 */}
      <div className="mx-auto min-h-dvh w-full max-w-97.5 min-w-75 bg-white">
        {/* 공통 헤더 */}
        <header className="bg-black text-white px-4 py-3">say hello</header>

        {/* 페이지 영역 */}
        <main className="px-4 py-3 bg-white">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Layout;
