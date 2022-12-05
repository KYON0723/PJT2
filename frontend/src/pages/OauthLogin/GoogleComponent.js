import GoogleLogin from "./GoogleLogin";
import { useDispatch } from "react-redux";
import { googleLogin } from "../../redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import React from "react";

const GoogleComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onGoogleSignIn = async (res) => {
    const { credential } = res;
    const data = {
      id_token: credential,
    };
    dispatch(googleLogin(data))
      .unwrap()
      .then((res) => {
        res.status === "SUCCESS"
          ? res.data
            ? navigate("/")
            : navigate("/googleintro", { state: { ...data } })
          : console.log("bye");
      })
      .catch((err) => console.error(err));
  };
  return <GoogleLogin onGoogleSignIn={onGoogleSignIn} />;
};

export default React.memo(GoogleComponent);
