import axios from "axios";

const api = axios.create({
  baseURL: "http://52.79.242.162/api/", // Spring Boot 서버 주소
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: 로그인 후 토큰이 있다면 헤더에 자동 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
