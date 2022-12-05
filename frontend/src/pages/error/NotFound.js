import NavBar from "./../../components/NavBar";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: #f5f5f5;
  height: 100vh;
`;

const MyButton = styled.button`
  border: none;
  border-radius: 10px;
  background-color: #75a7ff;
  width: 140px;
  padding: 20px;
  font-size: 18px;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <NavBar />
      <h1>존재하지않는 페이지입니다.</h1>
      <MyButton onClick={() => navigate("/")}>돌아가기</MyButton>
    </Container>
  );
};

export default NotFound;
