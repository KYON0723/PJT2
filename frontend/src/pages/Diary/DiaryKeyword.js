import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar";
import axios from "axios";

// css
import "./Diary.scss";
import styled from "styled-components";
import Loading from "../../util/Loading";
import DiaryButton from "./Components/DiaryButton";

const ImgWrapper = styled.div`
  @media screen and (max-width: 1000px) {
    width: 70vw;
    height: 50vw;
  }
  width: 42vw;
  height: 30vw;
  margin-bottom: 40px;
`;

const Simg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

const WordCount = styled.div`
  font-size: 18px;
`;

const DiaryKeyword = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { image } = location.state;

  // 단어 데이터
  const [wordList, setWordList] = useState([]);

  // 선택된 단어
  const [checkedList, setCheckedLists] = useState([]);

  // 단어 추천 함수
  const wordRecommend = async () => {
    if (loading) {
      const formData = new FormData();
      formData.append("image", image.image_file);

      try {
        const res = await axios({
          method: "post",
          url: "https://j7d209.p.ssafy.io/ai-api/diaries/keywords/",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setWordList(res.data.data);
      } catch (e) {
        console.log(e);
        // 에러 발생시 테스트용 임시 단어 제공
        setWordList(["test"]);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    wordRecommend();
  });

  // 선택에 따라 리스트 값 변경
  const onCheckedElement = useCallback(
    (checked, item) => {
      if (checked) {
        setCheckedLists([...checkedList, item]);
      } else {
        setCheckedLists(checkedList.filter((el) => el !== item));
      }
    },
    [checkedList]
  );

  return (
    <div className="background">
      <NavBar />

      {loading ? (
        <div>
          <div>AI 단어 추천 중...</div>
          <Loading />
        </div>
      ) : (
        <div className="back">
          <div className="diary-wrapper">
            {/* 머리글 */}
            <div className="diary-header">🔎일기장에 쓸 단어를 골라볼까요?</div>

            {/* 사진 */}
            <ImgWrapper>
              <Simg src={image.preview_URL} alt="이미지 없음" />
            </ImgWrapper>

            <div className="word-head">AI 추천 단어</div>
            
            {/* 단어 선택 */}
            <div className="words">
              <div className="keyword-check">
                {wordList.map((item, index) => (
                  <div key={index}>
                    <input
                      className="btn"
                      id={item}
                      value={item}
                      type="checkbox"
                      onChange={(e) => onCheckedElement(e.target.checked, item)}
                      checked={checkedList.includes(item) ? true : false}
                    />
                    <label htmlFor={item} className="check-button">
                      <span>{item}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <WordCount> 사용할 단어: {checkedList.length}</WordCount>

            <div>
              {checkedList.length !== 0 ? (
                <DiaryButton
                  back="#63b4f4"
                  onClick={() =>
                    navigate("/diarywriting", {
                      state: { image: image, checkedList: checkedList },
                    })
                  }
                  text="일기 쓰러가기"
                />
              ) : (
                <DiaryButton back="#ff9100" text="단어를 선택해주세요!" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiaryKeyword;
