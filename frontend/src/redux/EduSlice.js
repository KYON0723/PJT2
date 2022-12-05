import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { eduApi } from "../shared/eduApi";

const initialState = {
  word: 1,
  sentence: 1,
  quiz: {
    word: 1,
    sentence: 1,
  },
};

export const getdata = createAsyncThunk(
  "EduSlice/getword",
  async (type, { rejectWithValue }) => {
    try {
      // const res = await eduApi.getdata(type);
      const res = await eduApi.getdata(type);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const quizSubmit = createAsyncThunk(
  "EduSlice/quizSubmit",
  async (info, { rejectWithValue }) => {
    const { category } = info;
    const { data } = info;
    const submitData = {
      data,
    };
    try {
      const res = await eduApi.quizsubmit(category, submitData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const eduSlice = createSlice({
  name: "edu",
  initialState,
  reducers: {
    goNext(state, title) {
      title.payload === "word" ? (state.word += 1) : (state.sentence += 1);
    },
    goPrev(state, title) {
      title.payload === "word" ? (state.word -= 1) : (state.sentence -= 1);
    },
    successQuiz(state) {
      state.quiz += 1;
    },
    quizNext(state, title) {
      title.payload === "word"
        ? (state.quiz.word += 1)
        : (state.quiz.sentence += 1);
    },
    quizPrev(state, title) {
      title.payload === "word"
        ? (state.quiz.word -= 1)
        : (state.quiz.sentence -= 1);
    },

    resetQuiz(state, title) {
      if (title.payload === "word") {
        state.quiz.word = 1;
        state.word = 1;
      } else {
        state.quiz.sentence = 1;
        state.sentence = 1;
      }
    },
    resetEdu(state) {
      state.word = 1;
      state.quiz.word = 1;
      state.sentence = 1;
      state.quiz.sentence = 1;
    },
  },
});

export const eduActions = eduSlice.actions;
export default eduSlice.reducer;
