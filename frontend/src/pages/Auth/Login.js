import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/AuthSlice";
import GoogleComponent from "../OauthLogin/GoogleComponent";
import Swal from "sweetalert2";

const backgroundImage = process.env.PUBLIC_URL + `/assets/testground.jpg`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: 100vw 100vh;
`;

const LogoDiv = styled.div`
  @media screen and (min-width: 1000px) {
    margin-right: 50px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const LogoImg = styled.img`
  @media screen and (max-width: 640px) {
    width: 70px;
    height: 70px;
  }

  width: 100px;
  height: 100px;
  margin: 10px;
`;

const LogoText = styled.h1`
  @media screen and (max-width: 640px) {
    font-size: 50px;
  }
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
  font-size: 80px;
  font-family: OKDDUNG;
  color: #ffca28;
  margin: 10px;
`;

const InputDiv = styled.div`
  @media screen and (max-width: 1000px) {
    width: 50vw;
    // margin-left: 6vw;
  }

  width: 20vw;
  margin-bottom: 10px;
`;

const SButton = styled.button`
  @media screen and (max-width: 1000px) {
    width: 50vw;
  }
  border-radius: 20px;
  color: white;
  border: none;
  background-color: #42a5f5;
  padding: 5px;
  margin-top: 40px;
  width: 20vw;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const IconDiv2 = styled.div`
  @media screen and (max-width: 1000px) {
    // margin-left: 6vw;
  }
  margin: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
`;

const StyledP = styled.p`
  @media screen and (max-width: 1000px) {
    font-size: 16px;
  }
  font-size: 18px;
  cursor: pointer;
`;

const FooterDiv = styled.div`
  @media screen and (max-width: 1000px) {
    // margin-left: 6vw;
  }
  width: 400px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const LoginButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const data = {
      username,
      password,
    };

    dispatch(login(data))
      .unwrap()
      .then(() => navigate("/"))
      .catch(() => {
        Swal.fire({ icon: "error", title: "사용자 정보를 확인해주세요" });
      });
  };

  return (
    <>
      <LoginContainer>
        <LogoDiv>
          <LogoImg
            src={process.env.PUBLIC_URL + `/assets/logo.png`}
            alt="#"
          ></LogoImg>
          <LogoText>IEng</LogoText>
        </LogoDiv>
        <InputDiv>
          <TextField
            fullWidth
            label="ID(email)"
            variant="standard"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputDiv>
        <InputDiv>
          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="standard"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </InputDiv>
        <LoginButtonBox>
          <SButton onClick={handleSubmit}>로그인</SButton>
          <IconDiv2>
            <GoogleComponent text="로그인" />
          </IconDiv2>
        </LoginButtonBox>
        <FooterDiv>
          <StyledP onClick={() => navigate("/signup")}>회원가입</StyledP>
        </FooterDiv>
      </LoginContainer>
    </>
  );
};

export default Login;
