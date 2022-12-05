import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px;
`;

const SButton = styled.button`
  border-radius: 15px;
  color: white;
  border: none;
  background-color: ${(props) => props.color};
  padding: 10px;
  cursor: pointer;
  margin: 5px;
  font-size: 16px;
`;

const ButtonFooter = ({ handleSubmit }) => {
  const navigate = useNavigate();
  return (
    <ButtonDiv>
      <SButton color="#42a5f5" onClick={handleSubmit}>
        수정
      </SButton>
      <SButton color="#bdbdbd" onClick={() => navigate(-1)}>
        취소
      </SButton>
    </ButtonDiv>
  );
};

export default ButtonFooter;
