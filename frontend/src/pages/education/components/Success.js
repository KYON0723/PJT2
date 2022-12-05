import styled from "styled-components";
import { BsArrowRightCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { eduActions } from "../../../redux/EduSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import SpeechRecognition from "react-speech-recognition";

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
  margin-top: 40px;
`;

const Success = ({ setSuccess, category, handleSubmit, setFinal, setOpen }) => {
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
      <TextDiv>참 잘했어요!</TextDiv>
      <TextDiv>
        <BsArrowRightCircle
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleSubmit();
            setSuccess(false);
            handleNext();
          }}
        />
      </TextDiv>
    </Container>
  );
};

export default Success;
