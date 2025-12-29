import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Layout from "./layout/Layout";

function App() {
  return (
    <>
      <Routes>
        {/* 모바일 뷰만 나타내기 위한 레이아웃 */}
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          {/* 기본으로 나타나게 될 화면은 최후에 로그인 유지 구현 후 변경 예정 */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
