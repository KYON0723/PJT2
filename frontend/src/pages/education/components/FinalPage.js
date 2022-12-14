import styled from "styled-components";
import { VscRefresh } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Container = styled.div`
  margin-top: 100px;
`;

const Titlediv = styled.div`
  font-size: 40px;
  font-weight: bold;
`;
const Contentdiv = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-top: 10px;
`;
const IconDiv = styled.div`
  font-size: 60px;
  font-weight: bold;
  margin-top: 100px;
  cursor: pointer;
`;

const FinalPage = ({ handleSubmit }) => {
  const navigate = useNavigate();
  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);
  return (
    <Container>
      <Titlediv>π νμ΅μ μλ£νμμ΅λλ€</Titlediv>
      <IconDiv>
        <VscRefresh
          onClick={() => {
            navigate("/");
          }}
        />
      </IconDiv>
      <Contentdiv>νμΌλ‘ λμκ°κΈ°</Contentdiv>
    </Container>
  );
};

export default FinalPage;
