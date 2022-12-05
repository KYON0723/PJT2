import { useState, useEffect, useCallback } from "react";
import ImageUploader from "./ImageUploader";
import NavBar from "../../components/NavBar";
import { diaryApi } from "../../shared/diaryApi";

// css
import "./Diary.scss";
import Loading from "../../util/Loading";
import styled from "styled-components";

const baseURL = process.env.PUBLIC_URL + `/image/`;

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

const DiaryStart = () => {
  const [image, setImage] = useState({
    image_file: {},
    preview_URL: "image/default_image.png",
  });

  const [today, setToday] = useState();
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(true);

  // 날짜 변환
  const getDate = useCallback(async () => {
    var date = new Date();

    let temp = date.getMonth() + 1;
    let month = temp;
    if (temp < 10) {
      month = `0${temp}`;
    }

    let temp2 = date.getDate();
    let day = temp2;
    if (temp2 < 10) {
      day = `0${temp2}`;
    }
    setToday(`${date.getFullYear()}-${month}-${day}`);
  }, []);

  const [diaryContent, setDiaryContent] = useState("");
  const [diaryEmotion, setDiaryEmotion] = useState("");
  const [diaryKeywordList, setDiaryKeywordList] = useState([]);
  const [diaryPicturePath, setDiaryPicturePath] = useState("");

  // 일기 불러오기
  const getDiary = useCallback(async () => {
    if (loading) {
      try {
        const res = await diaryApi.getdiary(today);
        if (res.data.status === "SUCCESS") {
          if (res.data.data.diaryEmotion) {
            setDiaryContent(res.data.data.diaryContent);
            setDiaryEmotion(res.data.data.diaryEmotion);
            setDiaryKeywordList(res.data.data.diaryKeywordList);
            setDiaryPicturePath(res.data.data.diaryPicturePath);

            setCheck(true);
          }
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [today, loading]);

  useEffect(() => {
    getDate();
    getDiary();
  });

  return (
    <div className="background">
      <NavBar />

      {loading ? (
        <div>
          <div>일기 작성 여부 확인중...</div>
          <Loading />
        </div>
      ) : (
        <div className="back">
          <div className="diary-wrapper">
            {check ? (
              <div>
                <div className="date" style={{ fontSize: "18px" }}>
                  {new Date().getFullYear()}년 {new Date().getMonth() + 1}월{" "}
                  {new Date().getDate()}일
                </div>
                <div className="diary-header">
                  🎉오늘의 일기
                  {/* 기분 */}
                  <EmojiBox>
                    <EmojiImg
                      src={diaryEmotion && baseURL + `${diaryEmotion}.png`}
                      alt="#"
                    />
                    <span>{diaryEmotion}</span>
                  </EmojiBox>
                </div>

                {/* 일기 메인 */}
                <div className="diary-body">
                  <div className="text">
                    {/* 사진 */}
                    <img src={diaryPicturePath} alt="" />
                    {/* 단어 */}
                    <WordList>
                      {diaryKeywordList.map((item, index) => (
                        <WordBox className="word-list" key={index}>
                          <span>#{item}</span>
                        </WordBox>
                      ))}
                    </WordList>

                    {/* 일기 */}
                    <div className="content">{diaryContent}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {/* 머리글 */}
                <div className="diary-header">
                  📷일기에 사용할 사진을 추가해주세요!
                </div>

                {/* 사진 업로드 */}
                <ImageUploader image={image} setImage={setImage} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiaryStart;
