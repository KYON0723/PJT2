import React, { useState } from "react";
import Header from "./Header";
import styled from "styled-components";

// 달력
import { format, addMonths, subMonths } from "date-fns";
import DaySection from "./DaySection";
import DayItems from "./DayItems";
import axios from "../../../shared/api";
import { useEffect } from "react";
import Loading from "./../../../util/Loading";
import EduHistory from "./EduHistory";

const Container = styled.div`
  @media screen and (max-width: 1000px) {
    width: 80%;
  }
  width: 50%;
  background-color: white;
  margin-top: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 5px 0px;
  border-radius: 10px;
`;

const Description = styled.div`
  text-align: start;
  font-size: 14px;
  padding: 10px;
  font-family: EarlyFontDiary;
`;

const MyCalendar = () => {
  const [originData, setOriginData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
    setLoading(true);
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
    setLoading(true);
  };
  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  useEffect(() => {
    const getMyhistories = async () => {
      const res = await axios.get("api/histories", {
        params: { date: format(currentMonth, "yyyy-MM") },
      });
      setOriginData(res.data.data);
    };
    getMyhistories();
    setLoading(false);
  }, [currentMonth]);

  return (
    <>
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Description>📗:다이어리 🧡:단어학습 💙:문장학습</Description>
            <Header
              currentMonth={currentMonth}
              prevMonth={prevMonth}
              nextMonth={nextMonth}
            />
            <DaySection />

            <DayItems
              currentMonth={currentMonth}
              selectedDate={selectedDate}
              onDateClick={onDateClick}
              setLoading={setLoading}
              {...originData}
            />
          </>
        )}
      </Container>
      <EduHistory date={format(selectedDate, "yyyy-MM-dd")} />
    </>
  );
};

export default MyCalendar;
