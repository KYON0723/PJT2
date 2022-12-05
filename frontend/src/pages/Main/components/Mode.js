import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { FaQuestion } from "react-icons/fa";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MyButton from "../../../components/MyButton";

const ModeBox = styled.div`
  margin: 20px;
`;

const ModeDiv = styled.div`
  @media screen and (max-width: 1000px) {
    width: 70vw;
    height: 70vw;
    &:hover {
      width: 73vw;
      height: 73vw;
      transition: 0.5s;
    }
  }

  @media screen and (min-width: 1000px) {
    &:hover {
      width: 26vw;
      height: 26vw;
      transition: 0.5s;
    }
  }

  position: relative;
  width: 25vw;
  height: 25vw;
  border: 1px solid #ececec;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 10px 0px;
  border-radius: 15px;
  background-color: ${(props) => props.back};
`;

const ModeImg = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const ModeQuestion = styled.div`
  position: absolute;
  top: 4%;
  left: 92%;
  cursor: pointer;
`;

const ModeContent = styled.div`
  font-size: 22px;
  margin: 20px;
  cursor: pointer;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: () => {
    return window.innerWidth > 900 ? 400 : "70%";
  },
  border: "2px solid #ececec",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

// 물음표 눌렀을 때 모달창
const BasicModal = ({ title, description }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <FaQuestion onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
          <MyButton
            onClick={handleClose}
            width={"30%"}
            padding={"5px"}
            text={"확인"}
          />
        </Box>
      </Modal>
    </div>
  );
};

// 모드 선택시 사용되는 모달창
const DetailModal = ({ open, handleClose, title }) => {
  const navigate = useNavigate();
  const goTitle = (t) => {
    if (t === "영어일기") {
      navigate("/diarystart");
    } else if (t === "단어") {
      navigate("/word");
    } else navigate("/sentence");
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MyButton
            onClick={() => goTitle(title)}
            width={"100%"}
            padding={"20px"}
            margin={"20px"}
            text={
              title === "영어일기"
                ? `${title} 작성하기`
                : `${title} 학습하러가기`
            }
            fontSize={"20px"}
          />
          <MyButton
            onClick={handleClose}
            width={"100%"}
            padding={"20px"}
            margin={"20px"}
            text={"뒤로가기"}
            backgroundColor={"#9ccc65"}
            fontSize={"20px"}
          />
        </Box>
      </Modal>
    </div>
  );
};

const Mode = ({ title, image, description, back }) => {
  const [openDetail, setOpenDetail] = useState(false);
  const handleOpen = () => setOpenDetail(true);
  const handleClose = () => setOpenDetail(false);

  return (
    <>
      <ModeBox>
        <ModeDiv back={back} data-aos="zoom-in">
          <ModeImg
            src={process.env.PUBLIC_URL + image || ""}
            alt="#"
            onClick={handleOpen}
          ></ModeImg>
          <ModeQuestion>
            <BasicModal title={title} description={description} />
          </ModeQuestion>
        </ModeDiv>
        <ModeContent onClick={handleOpen}>{title}</ModeContent>
        <DetailModal
          open={openDetail}
          handleClose={handleClose}
          title={title}
        />
      </ModeBox>
    </>
  );
};

export default Mode;
