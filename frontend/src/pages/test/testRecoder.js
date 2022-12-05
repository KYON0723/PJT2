import { useCallback, useState } from "react";
import axios from "axios";
import useRecorder from "./useRecoder"

// css
import { Button } from "@mui/material";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  maxWidth: 600,
  bgcolor: "background.paper",
  border: "2px solid #ececec",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const ApiTest = () => {
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
  const [res, setRes] = useState("");
  const [open, setOpen] = useState(false);
  const [sw, setSw] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 제출 
  const handleSubmit = useCallback(async () => {
    const formData = new FormData()
    setSw(true)
    let blob = await fetch(audioURL).then(r => r.blob());

    formData.append('voice', blob)

    const baseURL = "https://j7d209.p.ssafy.io/";
    // const baseURL = "";
    const postApi = axios.create({
      baseURL,
      headers: {
        "Content-type": "multipart/form-data",
      },
    });

    try{
      const res = await postApi.post("ai-api/studies/stt/", formData);

      if (res.data.message === "SUCCESS") {
        window.alert("분석 완료!");
        setRes(res.data.data)
        setSw(false)
      }
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      console.log(e)
      window.alert("분석 실패")
      setSw(false)
    }
  }, [audioURL]);

  return (
    <div>
      <Button 
        variant="outlined"
        color="success" 
        onClick={handleOpen}
      >말하기</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <audio src={audioURL} controls />
          { sw ? (
            <div></div>
          ) : (
            <div>
              <button onClick={startRecording} disabled={isRecording}>
                START
              </button>
              <button onClick={stopRecording} disabled={!isRecording}>
                STOP
              </button>
            </div>
          )}
          
          <br/>
          
          {audioURL === "" ? (
            <div>
              <Button
                variant="outlined"
                color="error"
              >녹음이 필요합니다</Button>
            </div>
          ) : (
            <div>
              { sw ? (
                <div>분석중...</div>
              ) : (
                <div>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={handleSubmit}
                  >
                    제출하기
                  </Button>
                </div>
              )}
            </div>
          )}
          
          <br/>

          { res === "" ? (
            <div>
              아직 분석 결과가 없어요
            </div>
          ) : (
            <div>
              결과 : {res}
            </div>
          )}

          <br/>
          
          <Button
            variant="outlined"
            color="success"
            onClick={handleClose}
          >닫기</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ApiTest;
