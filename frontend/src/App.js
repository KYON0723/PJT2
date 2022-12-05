import "./App.css";
import { useEffect } from "react";
import { getuser } from "./redux/AuthSlice";
import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// 메인
import Home from "./pages/Main/Home";

// 로그인
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import GoogleIntro from "./pages/OauthLogin/GoogleIntro";

// 일기 작성
import DiaryStart from "./pages/Diary/DiaryStart";
import DiaryKeyword from "./pages/Diary/DiaryKeyword";
import DiaryWriting from "./pages/Diary/DiaryWriting";
import DiaryCheck from "./pages/Diary/DiaryCheck";
import DiaryEnd from "./pages/Diary/DiaryEnd";

// 회원 정보
import ProfileEdit from "./pages/ProfileEdit/ProfileEdit";

// 학습
import Education from "./pages/education/Education";

// NotFound
import NotFound from "./pages/error/NotFound";
import MyInfo from "./pages/MyInfo/MyInfo";

// test
import Test from "./pages/test/test";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    AOS.init();
    if (token) {
      const getUser = () => {
        dispatch(getuser())
          .unwrap()
          .catch(() => {
            localStorage.setItem("token", "");
            navigate("/login");
          });
      };
      getUser();
    }
  }, [dispatch, navigate, token]);
  return (
    <>
      <div className="App">
        <Routes>
          {/* 메인 */}
          <Route path="/" element={<Home />} />

          {/* 로그인 */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/googleintro" element={<GoogleIntro />} />

          {/* 문장, 단어 */}
          <Route path="/:category" element={<Education />} />

          {/* 일기 작성 */}
          <Route path="/diarystart" element={<DiaryStart />} />
          <Route path="/diarykeyword" element={<DiaryKeyword />} />
          <Route path="/diarywriting" element={<DiaryWriting />} />
          <Route path="/diarycheck" element={<DiaryCheck />} />
          <Route path="/diaryend" element={<DiaryEnd />} />

          {/* 회원 정보 */}
          <Route path="/profileedit" element={<ProfileEdit />} />
          <Route path="/myinfo" element={<MyInfo />} />

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />

          {/* test */}
          <Route path="/test:category" element={<Test />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
