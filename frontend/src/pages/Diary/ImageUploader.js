import { useNavigate } from "react-router-dom";

// css
import "./imageUploader.scss";
import styled from "styled-components";
import DiaryButton from "./Components/DiaryButton";

const ImgWrapper = styled.div`
  @media screen and (max-width: 1000px) {
    width: 80vw;
  }
  width: 40vw;
`;

const Simg = styled.img`
  width: 85%;
  height: 85%;
  border-radius: 20px;
`;

const ImageUploader = ({ image, setImage }) => {
  const navigate = useNavigate();
  let inputRef;

  // 이미지 저장
  const saveImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }

    fileReader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      });
    };
  };

  return (
    <div className="uploader-wrapper">
      {/* 이미지 업로드 */}
      <input
        type="file"
        accept="image/*"
        onChange={saveImage}
        ref={(refParam) => (inputRef = refParam)}
        style={{ display: "none" }}
      />

      {/* 미리보기 */}
      <ImgWrapper>
        <Simg
          src={image.preview_URL}
          alt="이미지 없음"
          onClick={() => inputRef.click()}
        />
      </ImgWrapper>

      <div>사진은 1MB 이하로 제출 해 주세요!</div>

      {/* 업로드 버튼 */}
      <div>
        {image.preview_URL === "image/default_image.png" ? (
          <DiaryButton
            back="#63b4f4"
            onClick={() => inputRef.click()}
            text="업로드"
          />
        ) : (
          <div>
            <DiaryButton
              back="#bdbdbd"
              onClick={() => inputRef.click()}
              text="사진 바꾸기"
            />
            <DiaryButton
              back="#63b4f4"
              onClick={() =>
                navigate("/DiaryKeyword", { state: { image: image } })
              }
              text="일기 쓰러가기"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
