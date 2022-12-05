import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  @media screen and (max-width: 1000px) {
    width: 77%;
  }
  box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 5px 0px;
  border-radius: 10px;
  padding: 17px;
  width: 48%;
  background-color: white;
`;

const HeaderBox = styled.div`
  display: flex;
`;

const ImgBox = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 70%;
  overflow: hidden;
  margin: 10px;
`;
const SImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NameBox = styled.div`
  text-align: start;
  margin: 15px;
`;

const Wrapper = styled.div`
  margin: 5px;
`;

const BigText = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const SmallText = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-top: 4px;
`;

const MyButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 8px;
  background-color: #2196f3;
  color: white;
  margin-top: 15px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #6ec6ff;
  }
`;

const basicImg =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const Profile = () => {
  const profileImg = useSelector((state) => state.auth.user.userImg);
  const nickName = useSelector((state) => state.auth.user.nickname);
  const email = useSelector((state) => state.auth.user.email);
  const birth = useSelector((state) => state.auth.user.birth);
  const navigate = useNavigate();
  return (
    <Container>
      <HeaderBox>
        <ImgBox>
          <SImg src={profileImg || basicImg} alt="#"></SImg>
        </ImgBox>

        <NameBox>
          <Wrapper>
            <div>닉네임</div>
            <BigText>{nickName || "guest"}</BigText>
          </Wrapper>
          <div>
            <HeaderBox>
              <Wrapper>
                <div>📧이메일</div>
                <SmallText>{email}</SmallText>
              </Wrapper>
              <Wrapper>
                <div>🎁생일</div>
                <SmallText>{birth}</SmallText>
              </Wrapper>
            </HeaderBox>
            <MyButton onClick={() => navigate("/profileedit")}>
              프로필 수정
            </MyButton>
          </div>
        </NameBox>
      </HeaderBox>
    </Container>
  );
};

export default Profile;
