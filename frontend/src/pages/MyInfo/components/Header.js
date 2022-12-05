import React from "react";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { format } from "date-fns";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const LeftDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  cursor: pointer;
`;

const MonthTitle = styled.h1`
  margin-right: 5px;
`;

const Header = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <Container>
      <ItemDiv>
        <AiOutlineLeft onClick={prevMonth} />
      </ItemDiv>
      <LeftDiv>
        <MonthTitle>{format(currentMonth, "M")}월</MonthTitle>
        <p>{format(currentMonth, "yyyy")}</p>
      </LeftDiv>
      <ItemDiv>
        <AiOutlineRight onClick={nextMonth} />
      </ItemDiv>
    </Container>
  );
};

export default React.memo(Header);
