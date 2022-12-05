import { TextField } from "@mui/material";
import { googleback } from "../../assets/BackgroundImg";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { googleNickname } from "../../redux/AuthSlice";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TbCameraPlus } from "react-icons/tb";
import Swal from "sweetalert2";

const Container = styled.div`
  @media screen and (max-width: 1000px) {
    background-color: #f5f5f5;
    background-image: none;
  }
  background-image: url(${googleback});
  background-size: 100vw 100vh;
  font-family: KOTRAHOPE;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Wrapper = styled.div`
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 10px 0px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 350px;
  position: relative;
`;

const Post = styled.div`
  position: absolute;
  background-color: #ffca28;
  width: 80px;
  height: 30px;
  z-index: 1;
  top: -15px;
  left: auto;
`;

const InputBox = styled.div`
  margin: 5px 0px;
`;

const MyButton = styled.button`
  border: none;
  border-radius: 10px;
  color: white;
  background-color: #42a5f5;
  padding: 10px;
  margin-top: 40px;
  width: 60px;
  font-size: 14px;
  cursor: pointer;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileBox = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 70%;
  overflow: hidden;
`;

const Profileimg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GoogleIntro = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const inputRef = useRef();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [nickname, setNickname] = useState("");
  const [birth, setBirth] = useState("");
  const [preview, setPreview] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [profile, setProfile] = useState("");

  const changeImg = (e) => {
    setProfile(e.target.files[0]);
  };

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setPreview(reader.result);
        resolve();
      };
    });
  };

  const handleSubmit = () => {
    if (profile === "") {
      Swal.fire({ icon: "error", title: "프로필 사진을 추가해주세요!" });
      return;
    }

    const datetimeRegexp = /^([0-9]{4}-[0-9]{2}-[0-9]{2})/;
    if (!datetimeRegexp.test(birth)) {
      Swal.fire({ icon: "error", title: "생년월일을 올바르게 입력해주세요!" });
      return;
    }

    const { id_token } = location.state;

    const data = {
      id_token,
      provider: "google",
      nickname,
      birth_YMD: birth,
    };

    const formData = new FormData();

    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });

    formData.append("data", blob);
    formData.append("profile_image", profile);

    dispatch(googleNickname(formData))
      .unwrap()
      .then(() => {
        Swal.fire({ icon: "success", title: "회원가입이 완료되었습니다!" });
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    isLoggedIn && navigate("/");
  }, [isLoggedIn, navigate]);
  return (
    <Container>
      <Wrapper>
        <Post />
        <h1>추가정보입력</h1>
        <ProfileContainer>
          <ProfileSection>
            <ProfileBox>
              <Profileimg src={preview} alt="" />
            </ProfileBox>
            <input
              type="file"
              name="file"
              onChange={(e) => {
                changeImg(e);
                encodeFileToBase64(e.target.files[0]);
              }}
              ref={inputRef}
              style={{ display: "none" }}
            />
            <div style={{ fontSize: "20px", marginTop: "5px" }}>
              <TbCameraPlus
                onClick={() => inputRef.current.click()}
                style={{ cursor: "pointer" }}
              />
            </div>
          </ProfileSection>
        </ProfileContainer>
        <InputBox>
          <TextField
            label="닉네임"
            variant="standard"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </InputBox>
        <InputBox>
          <TextField
            label="생년월일(YYYY-MM-DD)"
            variant="standard"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
        </InputBox>
        <MyButton onClick={handleSubmit}>전송</MyButton>
      </Wrapper>
    </Container>
  );
};

export default GoogleIntro;
