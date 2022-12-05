import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 15px;
  margin-right: 5px;
  margin-left: 5px;
`;
const Timer = ({ setTimeOn }) => {
  const [min, setMin] = useState(5);
  const [sec, setSec] = useState(0);
  const time = useRef(300);

  useEffect(() => {
    const countdown = setInterval(() => {
      const mm = parseInt(time.current / 60);
      const ss = time.current % 60;
      if (mm > -1) {
        setMin(parseInt(time.current / 60));
      }
      if (ss > -1) {
        setSec(time.current % 60);
      }
      if (time.current < 0) {
        window.alert("인증시간 초과");
        clearInterval(countdown);
        setTimeOn(false);
      } else {
        time.current -= 1;
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [setTimeOn]);

  return (
    <Container>
      {min}:{sec < 10 ? "0" + sec : sec}
    </Container>
  );
};

export default React.memo(Timer);
