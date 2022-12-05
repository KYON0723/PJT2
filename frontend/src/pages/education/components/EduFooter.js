import styled from "styled-components";
import { BiVolumeFull, BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import { FaRegPaperPlane } from "react-icons/fa";
import { VscRefresh } from "react-icons/vsc";

import { useEffect } from "react";

// STT
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const IconDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  font-size: 50px;
  cursor: pointer;
`;

const Pdiv = styled.div`
  position: relative;
`;

const Cdiv = styled.div`
  position: absolute;
  top: -50px;
  left: 100px;
`;

const TextDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 20px 20px 20px 0px;
  background-color: white;
  width: ${(props) => props.width};
  padding: 5px;
  word-break: keep-all;
`;

const TextP = styled.p`
  font-size: 25px;
`;
const MyMessage = styled.p`
  font-size: 25px;
  margin: 10px;
`;

const Icon = styled.div`
  display: flex;
  margin: 10px;
  font-size: 25px;
  cursor: pointer;
`;

const EduFooter = ({
  quiz,
  category,
  word,
  setSuccess,
  setFail,
  open,
  setOpen,
}) => {
  // TTS
  const { transcript, resetTranscript } = useSpeechRecognition();

  const textToSpeech = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.7;
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const speechToText = () => {
    if (!open) {
      SpeechRecognition.startListening({
        continuous: true,
        language: "en-US",
      });
    } else SpeechRecognition.stopListening();
    setOpen(!open);
  };

  const handleCheck = () => {
    if (category === "word") {
      transcript.toLowerCase() === word.word ? setSuccess(true) : setFail(true);
    } else {
      transcript.toLowerCase() === word.sentence
        ? setSuccess(true)
        : setFail(true);
    }
  };

  useEffect(() => {
    SpeechRecognition.stopListening();
    return () => {
      SpeechRecognition.stopListening();
      setOpen(false);
      resetTranscript();
    };
  }, [word, setOpen, resetTranscript]);

  return (
    <Container>
      {quiz ? null : (
        <IconDiv>
          <BiVolumeFull onClick={() => textToSpeech(word)} />
          <TextP>듣기</TextP>
        </IconDiv>
      )}

      <Pdiv>
        <IconDiv>
          {open ? (
            <BiMicrophone onClick={speechToText} />
          ) : (
            <BiMicrophoneOff onClick={speechToText} />
          )}
          <TextP>말하기</TextP>
        </IconDiv>
        <Cdiv>
          {open ? (
            <TextDiv>
              <MyMessage>
                {transcript.length === 0 ? "말해볼까요?" : transcript}
              </MyMessage>
              <Icon>
                {quiz ? <FaRegPaperPlane onClick={handleCheck} /> : null}
                <VscRefresh
                  onClick={resetTranscript}
                  style={{ marginLeft: "3px" }}
                />
              </Icon>
            </TextDiv>
          ) : null}
        </Cdiv>
      </Pdiv>
    </Container>
  );
};

export default EduFooter;
