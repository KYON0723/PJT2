import axios from "./api";
export const eduApi = {
  getdata: (type) => axios.get(`api/${type}s`, { params: { number: 3 } }),
  quizsubmit: (type, data) => axios.post(`api/histories/${type}s`, data),
};
