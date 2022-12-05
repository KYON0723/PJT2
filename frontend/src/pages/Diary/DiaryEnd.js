import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar";

// css
import "./Diary.scss";
import styled from "styled-components";
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
  background-color: white;
  color: ${(props) => props.color};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 5px 0px;
  margin: 10px;
  padding: 8px;
  border-radius: 15px;
`;

const EmojiBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  font-size: 1rem;
  border-radius: 20px;
  background-color: white;
  height: 90px;
  width: 75px;
  border: 1px solid black;
`;

const EmojiImg = styled.img`
  width: 50px;
`;

const DiaryEnd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { image, checkedList, emotion, diary } = location.state;
  const today = new Date();
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
            🎉일기 작성이 끝났어요!
            {/* 날짜 */}
            <div className="date">
              {today.getFullYear()}년 {today.getMonth() + 1}월 {today.getDate()}
              일
            </div>
            {/* 기분 */}
            <EmojiBox>
              <EmojiImg src={`image/${emotion}.png`} alt="" />
              <span>{emotion}</span>
            </EmojiBox>
          </div>

          {/* 일기 메인 */}
          <div className="diary-body">
            <div className="text">
              {/* 사진 */}
              <img src={image.preview_URL} alt="" />

              <WordList>
                {checkedList.map((item, index) => (
                  <WordBox className="word-list" key={index}>
                    #{item}
                  </WordBox>
                ))}
              </WordList>
              {/* 일기 */}
              <div className="content">{diary}</div>
            </div>
          </div>

          <DiaryButton
            onClick={() => navigate("/")}
            back="#63b4f4"
            text="홈으로"
          />
        </div>
      </div>
    </div>
  );
};

export default DiaryEnd;
