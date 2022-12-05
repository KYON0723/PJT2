import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
} from "date-fns";
import React from "react";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-contenr: center;
  text-align: start;
`;
const RowsWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const DayBox = styled.div`
  margin: 10px;
  margin-top: 10px;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 5px 0px;
  padding: 3px;
  height: 50px;
  width: 100%;
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.color};
  background-color: ${(props) => props.back};
  cursor: pointer;
`;

const DayBoxTitle = styled.div`
  height: 20%;
  margin-left: 4px;
  margin-top: 4px;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
`;

const DayBoxItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

const DayItems = ({
  currentMonth,
  selectedDate,
  onDateClick,
  diary_histories,
  word_histories,
  sentence_histories,
}) => {
  // 시작날짜
  const monthStart = startOfMonth(currentMonth);
  // 끝 날짜
  const monthEnd = endOfMonth(monthStart);
  // 첫째주의 시작 날짜
  const startDate = startOfWeek(monthStart);
  // 마지막 주의 끝 날짜
  const endDate = endOfWeek(monthEnd);
  // parse(monthEnd);
  const rows = [];
  let days = [];
  let day = startDate;
  let formatDate = "";
  let compareDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formatDate = format(day, "d");
      compareDate = format(day, "yyyy-MM-dd");

      const diaryCheck =
        diary_histories && diary_histories.includes(compareDate) ? true : false;
      const wordCheck =
        word_histories && word_histories.includes(compareDate) ? true : false;
      const sentenceCheck =
        sentence_histories && sentence_histories.includes(compareDate)
          ? true
          : false;

      const compareDay = isSameDay(day, selectedDate);
      const cloneDay = day;

      days.push(
        !isSameMonth(day, monthStart) ? (
          <DayBox color="#ececec" key={day}>
            {formatDate}
          </DayBox>
        ) : (
          <DayBox
            onClick={() => onDateClick(cloneDay)}
            key={day}
            back={compareDay ? "#aed581" : ""}
          >
            <DayBoxTitle>{formatDate}</DayBoxTitle>
            <ItemWrapper>
              {diaryCheck ? <DayBoxItem>📗</DayBoxItem> : null}
              {wordCheck ? <DayBoxItem>🧡</DayBoxItem> : null}
              {sentenceCheck ? <DayBoxItem>💙</DayBoxItem> : null}
            </ItemWrapper>
          </DayBox>
        )
      );
      day = addDays(day, 1);
    }
    rows.push(<RowsWrapper key={day}>{days}</RowsWrapper>);
    days = [];
  }

  return <Container>{rows}</Container>;
};

export default React.memo(DayItems);
