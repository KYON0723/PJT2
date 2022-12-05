import styled from "styled-components";
import { BiVolumeFull, BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import { FaRegPaperPlane } from "react-icons/fa";
import { VscRefresh } from "react-icons/vsc";

import { useEffect } from "react";
import TestRecoder from "../testRecoder.js"

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
  top: -80px;
  left: 50px;
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

const Icon = styled.div`
  display: flex;
  font-size: 25px;
  cursor: pointer;
`;

const EduFooter = ({ quiz, word, setSuccess, setFail, open, setOpen }) => {
  // const [status, setStatus] = useState(false);

  // TTS
  const {
    transcript,
    // listening,
    resetTranscript,
    // browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

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
    transcript === word.sentence ? setSuccess(true) : setFail(true);
  };

  useEffect(() => {
    SpeechRecognition.stopListening();
    return () => {
      SpeechRecognition.stopListening();
    };
  }, [word]);

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
              <TextP>
                {transcript.length === 0 ? "말해볼까요?" : transcript}
              </TextP>
              <Icon>
                <FaRegPaperPlane onClick={handleCheck} />
                <VscRefresh onClick={resetTranscript} />
              </Icon>
            </TextDiv>
          ) : null}
        </Cdiv>
      </Pdiv>
          
      <TestRecoder/>

    </Container>
  );
};

export default EduFooter;
