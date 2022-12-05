import styled from "styled-components";

const SButton = styled.button`
  border-radius: 20px;
  color: white;
  border: none;
  background-color: #42a5f5;
  margin-top: 40px;
  cursor: pointer;
  font-size: 14px;
`;

const MyButton = ({
  text,
  onClick,
  width,
  padding,
  margin,
  fontSize,
  backgroundColor,
}) => {
  return (
    <SButton
      onClick={onClick}
      style={{ width, padding, margin, fontSize, backgroundColor }}
    >
      {text}
    </SButton>
  );
};

export default MyButton;
