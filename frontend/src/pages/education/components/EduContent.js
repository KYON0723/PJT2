import styled from "styled-components";
import Swal from "sweetalert2";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { eduActions } from "./../../../redux/EduSlice";

import { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
import EduFooter from "./EduFooter";
import Success from "./Success";
import Fail from "./Fail";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;
`;

const TitleDiv = styled.div`
  text-align: center;
  font-size: 50px;
  font-weight: bold;
`;

const ContentDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40vh;
  margin-bottom: 20px;
`;

const ArrowDiv = styled.div`
  font-size: 100px;
  cursor: pointer;
`;

const StyledImg = styled.img`
  @media screen and (max-width: 1000px) {
    width: 60vw;
  }
  width: 40vw;
  height: 100%;
  object-fit: contain;
`;

const EduContent = ({
  category,
  originData,
  setSuccess,
  setFail,
  success,
  fail,
  setFinal,
  data,
  setData,
}) => {
  const wordCurrent = useSelector((state) => state.edu.word);
  const sentenceCurrent = useSelector((state) => state.edu.sentence);
  const quizWord = useSelector((state) => state.edu.quiz.word);
  const quizSentence = useSelector((state) => state.edu.quiz.sentence);

  const [quiz, setQuiz] = useState(false);
  const [word, setWord] = useState("");
  const [picture, setPicture] = useState("");
  const [open, setOpen] = useState(false);
  const [quizPic, setQuizPic] = useState("");

  const dispatch = useDispatch();

  // 문장 단어
  const handleNext = () => {
    if (category === "word" ? wordCurrent < 3 : sentenceCurrent < 3) {
      dispatch(eduActions.goNext(category));
    }

    if (category === "word" ? wordCurrent === 3 : sentenceCurrent === 3) {
      Swal.fire({
        title: `학습이 다 끝났어요`,
        text: "퀴즈 풀러갈까요?",
        icon: "success",

        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
        cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
        confirmButtonText: "네", // confirm 버튼 텍스트 지정
        cancelButtonText: "아니요", // cancel 버튼 텍스트 지정
      }).then((result) => {
        if (result.isConfirmed) {
          setQuiz(true);
        } else setQuiz(false);
      });
    }
  };

  const handleSubmit = () => {
    category === "word"
      ? setData([
          ...data,
          {
            word_seq: originData[quizWord - 1].wordSequence,
            is_correct: success,
          },
        ])
      : setData([
          ...data,
          {
            sentence_seq: originData[quizSentence - 1].sentenceSequence,
            is_correct: success,
          },
        ]);
  };

  const handlePrev = () => {
    if (category === "word" ? wordCurrent > 1 : sentenceCurrent > 1) {
      dispatch(eduActions.goPrev(category));
    }
  };

  const textToSpeech = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.7;
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const setInit = useCallback(() => {
    if (originData !== undefined) {
      const data =
        category === "word"
          ? originData[wordCurrent - 1].word
          : originData[sentenceCurrent - 1].sentence;
      const picturedata =
        category === "word"
          ? originData[wordCurrent - 1].wordPicturePath
          : originData[sentenceCurrent - 1].sentencePicturePath;
      setWord(data);
      setPicture(picturedata);
    }
  }, [originData, wordCurrent, sentenceCurrent, category]);

  // 퀴즈
  const currentType = category === "word" ? quizWord : quizSentence;

  const getQuizPic = useCallback(() => {
    const data =
      category === "word"
        ? originData[quizWord - 1].wordPicturePath
        : originData[quizSentence - 1].sentencePicturePath;
    setQuizPic(data);
  }, [category, originData, quizSentence, quizWord]);

  useEffect(() => {
    setInit();
    if (quiz) {
      getQuizPic();
    }
  }, [setInit, quiz, getQuizPic]);

  return (
    <>
      {quiz ? (
        <>
          <TitleDiv>맞춰볼까요?</TitleDiv>
          <Container>
            <ContentDiv>
              <StyledImg src={quizPic} alt="#"></StyledImg>
            </ContentDiv>
            <div>{currentType}/3</div>
            <EduFooter
              category={category}
              open={open}
              setOpen={setOpen}
              quiz={true}
              word={originData && originData[currentType - 1]}
              setSuccess={setSuccess}
              setFail={setFail}
              textToSpeech={textToSpeech}
            />
          </Container>
          {success ? (
            <Success
              setSuccess={setSuccess}
              category={category}
              handleSubmit={handleSubmit}
              setFinal={setFinal}
              data={data}
              setOpen={setOpen}
            />
          ) : null}
          {fail ? (
            <Fail
              setFail={setFail}
              category={category}
              handleSubmit={handleSubmit}
              setFinal={setFinal}
              data={data}
              setOpen={setOpen}
              textToSpeech={textToSpeech}
              check={
                category === "word"
                  ? originData[currentType - 1].word
                  : originData[currentType - 1].sentence
              }
            />
          ) : null}
        </>
      ) : (
        <>
          <TitleDiv>{originData && word}</TitleDiv>
          <Container>
            <ContentDiv>
              <ArrowDiv>
                <AiOutlineLeft onClick={handlePrev} />
              </ArrowDiv>
              <StyledImg src={picture} alt="#"></StyledImg>
              <ArrowDiv>
                <AiOutlineRight onClick={handleNext} />
              </ArrowDiv>
            </ContentDiv>
            <div>{category === "word" ? wordCurrent : sentenceCurrent}/3</div>
            <EduFooter
              textToSpeech={textToSpeech}
              open={open}
              setOpen={setOpen}
              quiz={false}
              word={word}
            />
          </Container>
        </>
      )}
    </>
  );
};

export default EduContent;
