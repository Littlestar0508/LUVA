import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Layout from "./layout/Layout";
import LoginGuard from "./components/LoginGuard";
import RequireLogin from "./components/RequireLogin";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Search from "./components/Search";
import Mypage from "./components/Mypage";
import useInsertProfileInfo from "./utils/useInsertProfileInfo";

function App() {
  useInsertProfileInfo();

  return (
    <>
      <Routes>
        {/* 모바일 뷰만 나타내기 위한 레이아웃 */}
        <Route element={<Layout />}>
          <Route
            path="/login"
            element={
              <LoginGuard>
                <Login />
              </LoginGuard>
            }
          />
          <Route
            path="/"
            element={
              <RequireLogin>
                <Home />
              </RequireLogin>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/search" element={<Search />} />
          <Route path="/mypage" element={<Mypage />} />
          {/* 기본으로 나타나게 될 화면은 최후에 로그인 유지 구현 후 변경 예정 */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
