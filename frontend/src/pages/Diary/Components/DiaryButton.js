import styled from "styled-components";

const MyButton = styled.button`
  color: white;
  font-weight: bold;
  font-size: 18px;
  border-radius: 20px;
  border: none;
  background-color: ${(props) => props.back};
  cursor: pointer;
  padding: 10px;
  margin: 30px 10px;
`;

const DiaryButton = ({ back, text, onClick }) => {
  return (
    <MyButton back={back} onClick={onClick}>
      {text}
    </MyButton>
  );
};

export default DiaryButton;
