import axios from "axios";

/**
 * 1. Axios 인스턴스 설정
 */
const api = axios.create({
  baseURL: "http://52.79.242.162/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 토큰 가져오기 함수 (sessionStorage를 명확하게 타겟팅)
const getToken = () => {
  return sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken");
};

// 토큰 삭제 함수
export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
};

/**
 * [인터셉터] 요청 헤더에 토큰 자동 주입
 * 중요: 모든 요청(Request) 직전에 실행되어 최신 토큰을 가져옵니다.
 */
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      // 토큰이 있을 때만 Bearer 헤더를 추가합니다.
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn("요청에 사용할 토큰이 없습니다.");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * [인터셉터] 응답 처리
 * 403 에러는 권한 문제이므로 재시도하지 않고 사용자에게 에러를 보냅니다.
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 403 Forbidden: 접근 권한이 없거나 토큰이 잘못됨
    if (error.response && error.response.status === 403) {
      console.error("403 Forbidden: 접근 권한이 없습니다.");
      return Promise.reject(error);
    }

    // 401 Unauthorized: 토큰 만료 시에만 갱신 로직 실행
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = sessionStorage.getItem("refreshToken") || localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          // 토큰 재발급 요청 (원본 인스턴스가 아닌 axios 기본 객체 사용)
          const { data } = await axios.post(
            "http://52.79.242.162/api/auth/refresh",
            { refreshToken }
          );
          const { accessToken, refreshToken: newRefreshToken } = data;
          
          // 재발급된 토큰 저장 (sessionStorage 우선)
          sessionStorage.setItem("accessToken", accessToken);
          if (newRefreshToken) sessionStorage.setItem("refreshToken", newRefreshToken);

          // 새 토큰으로 헤더 교체 후 원래 요청 재시도
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          clearTokens();
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

/**
 * 2. 인증 관련 API (Auth)
 */
export const authApi = {
  login: (data) => api.post("/auth/login", data),
  signup: (data) => api.post("/auth/signup", data),
  checkUsername: (username) => api.get(`/auth/check-username?username=${username}`),
  checkEmail: (email) => api.get(`/auth/check-email?email=${email}`),
  sendVerificationCode: (email) => api.post("/auth/send-verification-code", { email }),
  verifyCode: (email, code) => api.post("/auth/verify-code", { email, code }),
  findId: (email, code) => api.post("/auth/find-id", { email, code }),
  verifyResetUser: (username, email, code) => api.post("/auth/verify-reset-user", { username, email, code }),
  resetPassword: (username, newPassword) => api.post("/auth/reset-password", { username, newPassword }),
};

/**
 * 3. 게시판 관련 API (Board)
 */
export const boardApi = {
  getPostList: (page = 0, size = 20, sort = "createdAt,DESC") => api.get(`/board?page=${page}&size=${size}&sort=${sort}`),
  getPopularTop: () => api.get("/board/popular/top"),
  getPostDetail: (postId) => api.get(`/board/${postId}`),
  createPost: (data) => api.post("/board", data),
  updatePost: (postId, data) => api.put(`/board/${postId}`, data),
  deletePost: (postId) => api.delete(`/board/${postId}`),
  addLike: (postId) => api.post(`/board/${postId}/like`),
  removeLike: (postId) => api.delete(`/board/${postId}/like`),
  savePost: (postId) => api.post(`/board/${postId}/save`),
  unsavePost: (postId) => api.delete(`/board/${postId}/save`),
  createComment: (postId, data) => api.post(`/board/${postId}/comment`, data),
  updateComment: (commentId, data) => api.put(`/board/comments/${commentId}`, data),
  deleteComment: (commentId) => api.delete(`/board/comments/${commentId}`),
};

/**
 * 4. 유저 및 마이페이지 관련 API (User)
 */
export const userApi = {
  getUserProfile: () => api.get("/user/me"),
  updateUserProfile: (data) => api.put("/user/me", data), // 여기서 에러 발생 중
  getMyPosts: (sort = "createdAt,DESC") => api.get(`/user/posts?sort=${sort}`),
  getMyComments: (sort = "createdAt,DESC") => api.get(`/user/comments?sort=${sort}`),
  getLikedPosts: (sort = "createdAt,DESC") => api.get(`/user/liked-posts?sort=${sort}`),
  getSavedPosts: () => api.get("/user/saved-posts"),
  withdraw: (withdrawData) => api.post("/auth/withdraw", withdrawData), 
};

export default api;