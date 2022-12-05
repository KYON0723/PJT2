import axios from "./api";

export const studyApi = {
  // 학습한 날짜 목록 불러오기(월별)
  gethistorylist: (date) => axios.get(`api/histories?date=${date}`),

  // 학습 내역 불러오기
  gethistory: (date) => axios.get(`api/histories/studies?date=${date}`),
};
