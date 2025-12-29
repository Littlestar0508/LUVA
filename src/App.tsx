import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* element는 COMMON으로 교체 예정 - 레이아웃 */}
          <Route element={<Login />}>
            <Route path="/Login" element={<Login />} />
            {/* 기본으로 나타나게 될 화면은 최후에 로그인 유지 구현 후 변경 예정 */}
            <Route index element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
