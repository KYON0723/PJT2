import axios from "./api";

export const diaryApi = {
  // 일기 가져오기
  getdiary: (date) => axios.get(`api/diaries?date=${date}`),

  // 일기 삭제
  deletediary: (data) => axios.delete("api/diaries", { data: data }),
};
