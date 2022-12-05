import styled from "styled-components";

const CategoryBox = styled.div`
  display: flex;
  justify-content: start;
`;

const CategoryTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
  margin-right: 10px;
  padding: 5px;
  color: ${(props) => props.color};
  cursor: pointer;
`;

const EduHeader = ({ category, setCategory }) => {
  return (
    <CategoryBox>
      <CategoryTitle
        color={category === "diary" ? "" : "#bdbdbd"}
        onClick={() => setCategory("diary")}
      >
        다이어리
      </CategoryTitle>
      <CategoryTitle
        color={category === "edu" ? "" : "#bdbdbd"}
        onClick={() => setCategory("edu")}
      >
        학습내역
      </CategoryTitle>
    </CategoryBox>
  );
};

export default EduHeader;
