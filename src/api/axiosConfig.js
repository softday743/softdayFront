import axios from "axios";

const api = axios.create({
  baseURL: "http://52.79.242.162/api/", // Spring Boot 서버 주소
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper: Get token from either storage
const getToken = (key) => localStorage.getItem(key) || sessionStorage.getItem(key);

// Helper: Clear all tokens
const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
};

// 요청 인터셉터: 로그인 후 토큰이 있다면 헤더에 자동 추가
api.interceptors.request.use(
  (config) => {
    const token = getToken("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 감지 시 Refresh Token으로 갱신 시도
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // 저장소 확인 (Local 우선 확인 후 Session 확인)
      let refreshToken = localStorage.getItem("refreshToken");
      let storage = localStorage;

      if (!refreshToken) {
        refreshToken = sessionStorage.getItem("refreshToken");
        storage = sessionStorage;
      }

      if (refreshToken) {
        try {
          // 토큰 갱신 요청
          const { data } = await axios.post(
            "http://52.79.242.162/api/auth/refresh",
            { refreshToken }
          );

          // 새 토큰 저장
          const { accessToken, refreshToken: newRefreshToken } = data;
          
          // 원래 토큰이 있던 저장소에 업데이트
          storage.setItem("accessToken", accessToken);
          if (newRefreshToken) {
            storage.setItem("refreshToken", newRefreshToken);
          }

          // 헤더 업데이트 및 재요청
          api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed", refreshError);
          clearTokens();
          window.location.href = "/login";
        }
      } else {
        clearTokens();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
