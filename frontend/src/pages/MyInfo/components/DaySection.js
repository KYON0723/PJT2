import React from "react";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Sdiv = styled.div`
  background-color: #fff9c4;
  width: 10%;
`;

const DaySection = () => {
  const days = ["Sun", "Mon", "Thu", "Wed", "Thrs", "Fri", "Sat"];
  return (
    <Container>
      {days.map((v, i) => (
        <Sdiv key={i}>{v}</Sdiv>
      ))}
    </Container>
  );
};

export default React.memo(DaySection);
