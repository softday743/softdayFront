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

// 토큰 가져오기 함수
const getToken = () => {
  return (
    sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken")
  );
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
 */
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * [인터셉터] 응답 처리 (토큰 만료 시 재발급)
 */
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
      const refreshToken =
        sessionStorage.getItem("refreshToken") ||
        localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const { data } = await axios.post(
            "http://52.79.242.162/api/auth/refresh",
            { refreshToken }
          );
          const { accessToken, refreshToken: newRefreshToken } = data;
          sessionStorage.setItem("accessToken", accessToken);
          if (newRefreshToken)
            sessionStorage.setItem("refreshToken", newRefreshToken);

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
  checkUsername: (username) =>
    api.get(`/auth/check-username?username=${username}`),
  checkEmail: (email) => api.get(`/auth/check-email?email=${email}`),
  sendVerificationCode: (email) =>
    api.post("/auth/send-verification-code", { email }),
  verifyCode: (email, code) => api.post("/auth/verify-code", { email, code }),
  findId: (email, code) => api.post("/auth/find-id", { email, code }),
  verifyResetUser: (username, email, code) =>
    api.post("/auth/verify-reset-user", { username, email, code }),
  resetPassword: (username, newPassword) =>
    api.post("/auth/reset-password", { username, newPassword }),
};

/**
 * 3. 게시판 관련 API (Board)
 */
export const boardApi = {
  getPostList: (page = 0, size = 20, sort = "createdAt,DESC") =>
    api.get(`/board?page=${page}&size=${size}&sort=${sort}`),
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
  updateComment: (commentId, data) =>
    api.put(`/board/comments/${commentId}`, data),
  deleteComment: (commentId) => api.delete(`/board/comments/${commentId}`),
};

/**
 * 4. 유저 및 마이페이지 관련 API (User)
 */
export const userApi = {
  getUserProfile: () => api.get("/user/me"),
  updateUserProfile: (data) => api.patch("/user/me", data),
  getMyPosts: (sort = "newest") => api.get(`/user/posts?sort=${sort}`),
  getMyComments: (sort = "newest") => api.get(`/user/comments?sort=${sort}`),
  getLikedPosts: (sort = "liked_newest") =>
    api.get(`/user/liked-posts?sort=${sort}`),
  getSavedPosts: () => api.get("/user/saved-posts"),

  // 수정됨: 백엔드 @DeleteMapping("/me")에 맞춰 인자 없이 호출
  withdraw: () => api.delete("/user/me"),
};

export default api;