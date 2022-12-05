import TextField from "@mui/material/TextField";
import styled from "styled-components";
import ButtonFooter from "./ButtonFooter";

import { useState } from "react";
import { authApi } from "../../shared/authApi";
import Swal from "sweetalert2";

const MenuBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  margin: 20px 0;
`;

const MenuText = styled.p`
  font-size: 20px;
  width: 200px;
`;

const PasswordEdit = () => {
  const [pwd, setPwd] = useState("");
  const [newpwd, setNewpwd] = useState("");
  const [checkpwd, setCheckpwd] = useState("");
  const handleSubmit = () => {
    if (newpwd !== checkpwd) {
      Swal.fire({ icon: "error", title: "비밀번호가 일치하지 않습니다." });
      return;
    }

    const data = {
      cur_password: pwd,
      new_password: newpwd,
    };
    authApi
      .putpassword(data)
      .then(() =>
        Swal.fire({ icon: "success", title: "수정이 완료되었습니다." })
      )
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "비밀번호를 확인해주세요",
          timer: 2000,
        })
      );
  };

  return (
    <>
      <MenuBox>
        <MenuText>현재 비밀번호</MenuText>
        <TextField
          type="password"
          variant="standard"
          style={{ width: "30%" }}
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
      </MenuBox>
      <MenuBox>
        <MenuText>새 비밀번호</MenuText>
        <TextField
          type="password"
          variant="standard"
          style={{ width: "30%" }}
          value={newpwd}
          onChange={(e) => setNewpwd(e.target.value)}
        />
      </MenuBox>
      <MenuBox>
        <MenuText>새 비밀번호 확인</MenuText>
        <TextField
          type="password"
          variant="standard"
          style={{ width: "30%" }}
          value={checkpwd}
          onChange={(e) => setCheckpwd(e.target.value)}
        />
      </MenuBox>
      <ButtonFooter handleSubmit={handleSubmit} />
    </>
  );
};

export default PasswordEdit;
