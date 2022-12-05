import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/NavBar";
import { imgApi } from "../../shared/imgApi";

// css
import "./Diary.scss";
import Loading from "../../util/Loading";
import DiaryButton from "./Components/DiaryButton";
import Swal from "sweetalert2";

// headers 설정
const sp_api = axios.create({
  baseURL: "https://api.bing.microsoft.com/v7.0/spellcheck",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Ocp-Apim-Subscription-Key": "ce11f020da1241f182ed7ee34ec9fcc1",
  },
});

const DiaryCheck = () => {
  const location = useLocation();
  const { image, checkedList, emotion, diary } = location.state;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // 입력한 일기 내용
  const [content, setContent] = useState(diary);

  // 맞춤법 검사 결과
  const [checked, setChecked] = useState({});

  // 맞춤법 검사 함수
  const spellCheck = async (text) => {
    const mkt = "en-US";
    const mode = "proof";

    const { data } = await sp_api.post(`?mkt=${mkt}&mode=${mode}&text=${text}`);

    let wrongWordList = {};

    for (const word of data.flaggedTokens) {
      for (const sugges of word.suggestions) {
        if (sugges.score >= 0.65) {
          if (typeof wrongWordList[word.token] == "undefined") {
            wrongWordList[word.token] = [];
          }
          let temp = wrongWordList[word.token];
          temp.push(sugges.suggestion);
          wrongWordList[word.token] = temp;
        }
      }
    }
    setLoading(false);
    setChecked(wrongWordList);
  };

  useEffect(() => {
    spellCheck(diary);
  }, [diary]);

  // 일기 제출하기
  const handleSubmit = useCallback(async () => {
    const keywords = [];
    for (let i = 0; i < checkedList.length; i++) {
      keywords.push({ keyword: checkedList[i] });
    }

    const temp = {
      content: content,
      emotion: emotion,
      keywords: keywords,
    };

    const formData = new FormData();
    formData.append("diary_image", image.image_file);
    formData.append(
      "data",
      new Blob([JSON.stringify(temp)], { type: "application/json" })
    );

    try {
      const res = await imgApi.postdiary(formData);

      if (res.data.status === "SUCCESS") {
        navigate("/diaryend", {
          state: {
            image: image,
            checkedList: checkedList,
            emotion: emotion,
            diary: content,
          },
        });
      }
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      console.log(e);
    }
  }, [navigate, content, emotion, checkedList, image]);

  const SubmitAlert = () => {
    Swal.fire({
      title: "일기를 제출할까요?",
      icon: "success",

      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
      cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
      confirmButtonText: "네", // confirm 버튼 텍스트 지정
      cancelButtonText: "아니요", // cancel 버튼 텍스트 지정
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmit();
      } else return;
    });
  };

  return (
    <div className="background">
      <NavBar />

      {loading ? (
        <div>
          <div>AI 문법 검사 중...</div>
          <Loading />
        </div>
      ) : (
        <div className="back">
          <div className="diary-wrapper">
            {/* 머리글 */}
            <div className="diary-header">
              🤔어색한 부분을 같이 수정 해 볼까요?
            </div>

            {/* 일기 작성 */}
            <div className="diary-body">
              {/* 내용 */}
              <div className="text">
                <div>
                  <div className="diary-header">작성한 일기</div>
                  <textarea
                    style={{ fontFamily: "IM_Hyemin-Bold", fontSize: "24px" }}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                    className="text"
                    placeholder="일기를 작성해 봐요!"
                    value={content}
                  />
                </div>

                {/* 문법 체크 결과 */}
                <div>
                  {Object.keys(checked).length === 0 ? (
                    <div className="diary-header">👏수정할 곳이 없어요!</div>
                  ) : (
                    <>
                      <div className="diary-header">수정이 필요해요!</div>

                      <div className="checked">
                        <div>
                          {Object.entries(checked).map((item, index) => (
                            <div key={index}>
                              {item[0]} -&gt; {item[1]}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="button">
              <DiaryButton
                back="#bdbdbd"
                text="검사하기"
                onClick={() => {
                  spellCheck(content);
                }}
              />

              <DiaryButton
                back="#63b4f4"
                text="제출하기"
                onClick={SubmitAlert}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiaryCheck;
