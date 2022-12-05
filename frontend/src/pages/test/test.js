import NavBar from "../../components/NavBar";
import styled from "styled-components";
import EduContent from "./components/EduContent";
import { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getdata, quizSubmit } from "../../redux/EduSlice";
import FinalPage from "./components/FinalPage";
import Loading from "../../util/Loading";
import NotFound from "../error/NotFound";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justify};
  background-color: ${(props) => props.back};
  height: 100vh;
`;

const ApiTest = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const [originData, setOriginData] = useState();
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [final, setFinal] = useState(false);
  const [loading, setLoading] = useState(true);

  const getInit = useCallback(() => {
    dispatch(getdata(category))
      .unwrap()
      .then((res) => {
        category === "word"
          ? setOriginData(res.data?.wordSet)
          : setOriginData(res.data?.sentenceSet);
        setLoading(false);
      });
  }, [dispatch, category]);

  useEffect(() => {
    getInit();
  }, [getInit]);

  const handleSubmit = () => {
    const info = {
      category,
      data,
    };
    dispatch(quizSubmit(info))
      .unwrap()
      .catch((err) => console.error(err));
  };

  return (
    <>
      {["word", "sentence"].includes(category) ? (
        <Container
          back={
            success
              ? "#A5D6A7"
              : fail
              ? "#FFA270"
              : category === "word"
              ? "#fff9c4"
              : "#e1f5fe"
          }
          justify={final ? "start" : "space-between"}
        >
          <NavBar />
          {loading ? (
            <Loading />
          ) : final ? (
            <>
              <FinalPage handleSubmit={handleSubmit} />
            </>
          ) : (
            <EduContent
              category={category}
              originData={originData}
              setSuccess={setSuccess}
              setFail={setFail}
              success={success}
              fail={fail}
              setFinal={setFinal}
              data={data}
              setData={setData}
            />
          )}
        </Container>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default ApiTest;
