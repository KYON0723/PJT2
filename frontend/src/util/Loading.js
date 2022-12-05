import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  width: 100%;
  top: 30%;
`;

const SImg = styled.img`
  width: 100px;
  height: 100px;
`;
const loadgif = process.env.PUBLIC_URL + `/assets/loading.gif`;
const Loading = () => {
  return (
    <Container>
      <SImg src={loadgif} alt="#"></SImg>
    </Container>
  );
};

export default Loading;
