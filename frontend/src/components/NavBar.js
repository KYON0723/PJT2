import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/AuthSlice";

const NavDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  font-size: 40px;
`;

const logoImage = process.env.PUBLIC_URL + `/assets/logo.png`;

const StyledImage = styled.img`
  width: 80px;
  height: 80px;
  cursor: pointer;
`;

const RightImage = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  object-fit: cover;
`;

const HamBar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 70%;
  overflow: hidden;
  cursor: pointer;
  margin: 5px;
`;
const RightBar = styled.div`
  width: 60px;
  height: 60px;
  cursor: pointer;
  margin-top: 10px;
`;

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userImg = useSelector((state) => state.auth.user.userImg);
  const username = useSelector((state) => state.auth.user.nickname);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.setItem("token", "");
    dispatch(authActions.logout());
    navigate("/login");
  };

  return (
    <NavDiv>
      <div>
        <StyledImage src={logoImage} alt="#" onClick={() => navigate("/")} />
      </div>

      {userImg ? (
        <HamBar>
          <RightImage onClick={handleClick} src={userImg} alt="#" />
        </HamBar>
      ) : (
        <RightBar>
          <Avatar onClick={handleClick}>
            {username && username.slice(0, 3)}
          </Avatar>
        </RightBar>
      )}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => navigate("/myinfo")}>내 정보</MenuItem>
        <MenuItem onClick={() => navigate("/profileedit")}>
          회원정보 수정
        </MenuItem>
        <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
      </Menu>
    </NavDiv>
  );
};

export default NavBar;
