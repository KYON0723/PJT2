import styled from "styled-components";
import { useState, useEffect } from "react";
import { diaryApi } from "../../../shared/diaryApi";
import { format } from "date-fns";
import { studyApi } from "../../../shared/studyApi";
import EduHeader from "./EduHeader";
import { useNavigate } from "react-router-dom";
import Loading from "./../../../util/Loading";
import axios from "./../../../shared/api";
import Swal from "sweetalert2";

const Container = styled.div`
  @media screen and (max-width: 1000px) {
    width: 80%;
  }
  width: 50%;
  margin-top: 20px;
  margin-bottom: 30px;
  border-radius: 10px;
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 5px 0px;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DiaryImg = styled.img`
  width: 98%;
  height: 98%;
  border-radius: 15px;
`;

const DiaryMsg = styled.div`
  font-size: 20px;
  padding: 10px;
  font-weight: bold;
  margin-top: 20px;
`;

const DiaryButton = styled.button`
  border: none;
  color: white;
  font-weight: bold;
  font-size: 16px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${(props) => props.back};
  border-radius: 10px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hover};
  }
`;

const WordDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 40%;
  padding: 10px;
`;

const SentenceDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 60%;
  padding: 10px;
`;

const Boxtitle = styled.div`
  font-size: 20px;
  background-color: ${(props) => props.back};
  padding: 3px;
  width: 100%;
  text-align: start;
`;

const RowBox = styled.div`
  margin: 5px;
  font-size: 16px;
`;

const EmojiWrapper = styled.div`
  width: 70px;
  height: 70px;
  margin-top: 10px;
`;

const EmojiImg = styled.img`
  width: 100%;
  height: 100%;
`;

const EmojiBox = styled.div`
  margin: 2px;
  font-size: 18px;
`;

const SText = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0px;
`;

const ContentText = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: start;
  white-space: pre-line;
  word-break: keep-all;
  font-size: 18px;
  font-weight: bold;
  margin: 20px;
`;

const KeywordBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 93%;
`;

const KeywordP = styled.div`
  margin-right: 4px;
  font-size: 14px;
`;

const baseUrl = process.env.PUBLIC_URL + `image/`;

const EduHistory = ({ date }) => {
  const [category, setCategory] = useState("diary");
  const [initData, setInitData] = useState("");
  const [loading, setLoading] = useState(true);
  const today = format(new Date(), "yyyy-MM-dd");
  const same = date === today ? true : false;
  const navigate = useNavigate();

  const handleDeleteDiary = () => {
    const data = {
      date: date,
    };
    Swal.fire({
      title: "일기를 삭제하시겠습니까?",
      icon: "success",

      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
      cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
      confirmButtonText: "네", // confirm 버튼 텍스트 지정
      cancelButtonText: "아니요", // cancel 버튼 텍스트 지정
    }).then((res) => {
      if (res.isConfirmed) {
        axios.delete("api/diaries", { data: data });
        window.location.reload();
      } else return;
    });
  };

  useEffect(() => {
    if (category === "diary") {
      const getData = async () => {
        const res = await diaryApi.getdiary(date).catch((err) => {
          if (err.response.status === 401) {
            navigate("/login");
          }
        });
        setInitData(res.data.data);
      };
      getData();
    } else {
      const getData = async () => {
        const res = await studyApi.gethistory(date);
        setInitData(res.data.data);
      };
      getData();
    }

    setLoading(false);
  }, [date, category, navigate]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <EduHeader category={category} setCategory={setCategory} />
          {category === "diary" ? (
            <HeaderBox>
              {initData?.diaryPicturePath !== null ? (
                <ContentBox>
                  <EmojiWrapper>
                    <EmojiImg
                      src={initData && baseUrl + `${initData.diaryEmotion}.png`}
                      alt="#"
                    />
                  </EmojiWrapper>
                  <SText>{initData?.diaryEmotion}</SText>

                  <div>
                    <DiaryImg
                      src={initData.diaryPicturePath}
                      alt="#"
                    ></DiaryImg>
                  </div>
                  <KeywordBox>
                    {initData?.diaryKeywordList?.map((v, i) => (
                      <KeywordP key={i}>#{v}</KeywordP>
                    ))}
                  </KeywordBox>
                  <ContentText>{initData?.diaryContent}</ContentText>
                  <DiaryButton
                    onClick={handleDeleteDiary}
                    back="#fb8c00"
                    hover="#ffbd45"
                  >
                    일기 삭제
                  </DiaryButton>
                </ContentBox>
              ) : same ? (
                <div>
                  <DiaryMsg>오늘 일기를 적으러 가볼까요?</DiaryMsg>
                  <DiaryButton
                    back="#2196f3"
                    hover="#6ec6ff"
                    onClick={() => navigate("/diarystart")}
                  >
                    Go !
                  </DiaryButton>
                </div>
              ) : (
                <DiaryMsg>이 날은 일기를 안 적었네요</DiaryMsg>
              )}
            </HeaderBox>
          ) : (
            <HeaderBox>
              <WordDiv>
                <Boxtitle back="#ffcc80">🧡단어</Boxtitle>
                <EmojiBox>😀</EmojiBox>
                {initData?.correctWordList?.length === 0 ? (
                  <RowBox>맞춘 단어가 없어요</RowBox>
                ) : (
                  initData?.correctWordList?.map((v, i) => (
                    <RowBox key={i}>{v.word}</RowBox>
                  ))
                )}
                <EmojiBox>😢</EmojiBox>
                {initData?.incorrectWordList?.length === 0 ? (
                  <RowBox>틀린 단어가 없어요</RowBox>
                ) : (
                  initData?.incorrectWordList?.map((v, i) => (
                    <RowBox key={i}>{v.word}</RowBox>
                  ))
                )}
              </WordDiv>
              <SentenceDiv>
                <Boxtitle back="#81d4fa">💙문장</Boxtitle>
                <EmojiBox>😀</EmojiBox>
                {initData?.correctSentenceList?.length === 0 ? (
                  <RowBox>맞춘 문장이 없어요</RowBox>
                ) : (
                  initData?.correctSentenceList?.map((v, i) => (
                    <RowBox key={i}>{v.sentence}</RowBox>
                  ))
                )}
                <EmojiBox>😢</EmojiBox>
                {initData?.incorrectSentenceList?.length === 0 ? (
                  <RowBox>틀린 문장이 없어요</RowBox>
                ) : (
                  initData?.incorrectSentenceList?.map((v, i) => (
                    <RowBox key={i}>{v.sentence}</RowBox>
                  ))
                )}
              </SentenceDiv>
            </HeaderBox>
          )}
        </>
      )}
    </Container>
  );
};

export default EduHistory;
