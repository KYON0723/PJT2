import axios from "./api";
export const authApi = {
  // 이메일 중복 체크
  checkemail: (email) => axios.post("api/members/email/check", email),
  // 인증번호 보내기
  sendemail: (email) => axios.post("api/members/email/send", email),
  // 인증번호 검증
  confirmemail: (data) => axios.post("api/members/email/confirm", data),

  login: (data) => axios.post("api/login", data),
  googlelogin: (data) => axios.post("api/google-login", data),
  getuser: () => axios.get("api/members"),
  putpassword: (pwd) => axios.put("api/members/password", pwd),
  deleteuser: () => axios.delete("api/members"),
  getMyhistory: (date) => axios.get("api/histories", { params: { date } }),
};
