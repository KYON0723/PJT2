import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../shared/authApi";
import { imgApi } from "../shared/imgApi";

const initialState = {
  isLoggedIn: false,
  user: {
    nickname: "",
    email: "",
    userImg: "",
    birth: "",
    provider: "",
  },
};

export const signup = createAsyncThunk(
  "AuthSlice/signup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await imgApi.signup(data);
      localStorage.setItem("token", res.headers.authorization);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const login = createAsyncThunk(
  "AuthSlice/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.login(data);
      localStorage.setItem("token", res.headers.authorization);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const googleLogin = createAsyncThunk(
  "AuthSlice/googleLogin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.googlelogin(data);
      if (res.headers.authorization) {
        localStorage.setItem("token", res.headers.authorization);
      }
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const googleNickname = createAsyncThunk(
  "AuthSlice/googleNickname",
  async (data, { rejectWithValue }) => {
    try {
      const res = await imgApi.googlesignup(data);
      localStorage.setItem("token", res.headers.authorization);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 이메일 중복체크
export const checkEmail = createAsyncThunk(
  "AuthSlice/checkEmail",
  async (email, { rejectWithValue }) => {
    try {
      const res = await authApi.checkemail(email);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 이메일 인증번호 보내기
export const sendEmail = createAsyncThunk(
  "AuthSlice/sendEmail",
  async (email, { rejectWithValue }) => {
    try {
      const res = await authApi.sendemail(email);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 이메일 인증번호 확인
export const confirmEmail = createAsyncThunk(
  "AuthSlice/confirmEmail",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.confirmemail(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const emailAuth = createAsyncThunk(
  "AuthSlice/emailcehck",
  async (email, { rejectWithValue }) => {
    try {
      const res = await authApi.emailauth(email);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const getuser = createAsyncThunk(
  "AuthSlice/getuser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.getuser();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
    },
    reload(state) {
      state.isLoggedIn = true;
    },
  },
  extraReducers: {
    [signup.fulfilled]: (state) => {
      state.isLoggedIn = true;
    },
    [login.fulfilled]: (state) => {
      state.isLoggedIn = true;
    },
    [googleLogin.fulfilled]: (state, action) => {
      if (action.payload.data) {
        state.isLoggedIn = true;
      }
    },
    [googleNickname.fulfilled]: (state) => {
      state.isLoggedIn = true;
    },
    [getuser.fulfilled]: (state, action) => {
      const { data } = action.payload;
      state.isLoggedIn = true;
      state.user.nickname = data.nickname;
      state.user.email = data.email;
      state.user.userImg = data.picturePath;
      state.user.birth = data.birth_YMD;
      state.user.provider = data.provider;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
