import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar";

import styled from "styled-components";

// css
import "./Diary.scss";
import DiaryButton from "./Components/DiaryButton";
import { useEffect } from "react";

const WordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: start;
  width: 90%;
`;

const WordBox = styled.div`
  background-color: ${(props) => props.back};
  color: ${(props) => props.color};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 5px 0px;
  margin: 10px;
  padding: 8px;
  border-radius: 15px;
`;

const emo = [
  "Happy",
  "Fun",
  "Envy",
  "Curious",
  "Nervous",
  "SoSo",
  "Shy",
  "Tired",
  "Sad",
  "Angry",
];

const DiaryWriting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { image, checkedList } = location.state;

  // 오늘의 기분
  const [emotion, setEmotion] = useState("");

  const handleSelect = useCallback((e) => {
    setEmotion(e.target.value);
  }, []);

  // 일기 내용
  const [content, setContent] = useState("");

  // 사용한 단어들
  let CheckedWord = [];

  const wordCheck = () => {
    for (let i in checkedList) {
      if (content.toLowerCase().includes(checkedList[i].toLowerCase())) {
        CheckedWord.push(checkedList[i]);
      }
    }
  };
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="background">
      <NavBar />

      <div className="back">
        <div className="diary-wrapper">
          {/* 머리글 */}
          <div className="diary-header">
            {/* 감정 선택 */}
            <div className="headbox">
              <div className="diary-header">😁오늘의 감정</div>

              <div className="emo">
                {emo.map((value, index) => (
                  <div key={index}>
                    <input
                      className="btn"
                      name="emotion"
                      type="radio"
                      id={value}
                      value={value}
                      onChange={handleSelect}
                    />
                    <label htmlFor={value} className="emotion">
                      <img src={`image/${value}.png`} alt="#" />
                      <span>{value}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 일기 작성 */}
          <div className="diary-header">📗오늘의 일기</div>

          <div className="diary-body">
            <div className="text">
              {/* 사진 */}
              <div>
                <img src={image.preview_URL} alt="" />
              </div>

              {/* 단어 */}
              <WordList>
                {checkedList.map((item, idx) => (
                  <WordBox
                    key={idx}
                    back={
                      content.toLowerCase().includes(item.toLowerCase())
                        ? "#bdbdbd"
                        : "white"
                    }
                    color={
                      content.toLowerCase().includes(item.toLowerCase())
                        ? "white"
                        : "black"
                    }
                  >
                    #{item}
                  </WordBox>
                ))}
              </WordList>

              <div>
                <textarea
                  style={{ fontFamily: "IM_Hyemin-Bold", fontSize: "24px" }}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  className="text"
                  placeholder="오늘 하루는 어떤 일이 있었나요?"
                  value={content}
                />
              </div>
            </div>
          </div>

          <div>
            {emotion === "" || content === "" ? (
              <DiaryButton text="감정과 내용을 입력해주세요" back="#bdbdbd" />
            ) : (
              <DiaryButton
                back="#63b4f4"
                text="문법 체크"
                onClick={() => {
                  wordCheck();
                  navigate("/diarycheck", {
                    state: {
                      image: image,
                      checkedList: CheckedWord,
                      emotion: emotion,
                      diary: content,
                    },
                  });
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryWriting;
