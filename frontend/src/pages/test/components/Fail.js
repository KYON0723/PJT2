import styled from "styled-components";
import SpeechRecognition from "react-speech-recognition";

import { BiVolumeFull } from "react-icons/bi";
import { VscRefresh } from "react-icons/vsc";
import { BsArrowRightCircle } from "react-icons/bs";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { eduActions } from "../../../redux/EduSlice";
import { useSelector } from "react-redux";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TextDiv = styled.div`
  font-size: 80px;
  font-weight: bold;
  margin: 10px;
  cursor: ${(props) => props.pointer};
`;

const IconDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const Fail = ({
  setFail,
  category,
  handleSubmit,
  setFinal,
  setOpen,
  textToSpeech,
  check,
}) => {
  const dispatch = useDispatch();

  const word = useSelector((state) => state.edu.quiz.word);
  const sentence = useSelector((state) => state.edu.quiz.sentence);

  const handleNext = () => {
    if (category === "word" ? word < 3 : sentence < 3) {
      dispatch(eduActions.quizNext(category));
      return;
    }
    setFinal(true);
    dispatch(eduActions.resetQuiz(category));
  };

  useEffect(() => {
    SpeechRecognition.stopListening();
    setOpen(false);
  }, [setOpen]);

  return (
    <Container>
      <TextDiv>다시 풀어볼까요?</TextDiv>
      <IconDiv>
        <TextDiv pointer="pointer">
          <BiVolumeFull onClick={() => textToSpeech(check)} />
        </TextDiv>
        <TextDiv pointer="pointer">
          <VscRefresh onClick={() => setFail(false)} />
        </TextDiv>
        <TextDiv pointer="pointer">
          <BsArrowRightCircle
            onClick={() => {
              handleSubmit();
              setFail(false);
              handleNext();
            }}
          />
        </TextDiv>
      </IconDiv>
    </Container>
  );
};

export default Fail;
