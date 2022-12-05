import styled from "styled-components";
import NavBar from "../../components/NavBar";
// import Login from "../Auth/Login";
import Mode from "./components/Mode";
import { modeList } from "./ModeList";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Container = styled.div`
  @media screen and (min-width: 1000px) {
    height: 100vh;
  }

  background-color: #f5f5f5;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const ModeWrapper = styled.div`
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `IEng`;
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Container>
      <NavBar />
      <TitleDiv>
        <p>어떤 학습을 해볼까요?</p>
      </TitleDiv>
      <ModeWrapper>
        {modeList.map((it, idx) => (
          <Mode
            key={idx}
            title={it.title}
            description={it.description}
            image={it.image}
            back={it.back}
          />
        ))}
      </ModeWrapper>
    </Container>
  );
};

export default Home;
