import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import "./post-detail.css";

export function PostDetail({ onNavigate, postId }) {
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(true);
  const [replyToCommentId, setReplyToCommentId] = useState(null);

  // [수정] 로그인한 유저의 모든 정보 저장 (이메일 & 아이디)
  const [currentUser, setCurrentUser] = useState({ email: "", username: "" });

  useEffect(() => {
    if (postId) {
      fetchPostDetail();
      fetchCurrentUser();
    }
  }, [postId]);

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get("/user/me");
      // 백엔드 UserProfileResponse에 username 필드가 있어야 값이 들어옵니다.
      setCurrentUser({
        email: response.data.email,
        username: response.data.username,
      });
    } catch (error) {
      console.error("유저 정보 로드 실패", error);
    }
  };

  const fetchPostDetail = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/board/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error("상세 조회 실패", error);
      alert("게시글을 불러오지 못했습니다.");
      onNavigate("community");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm("정말 이 게시글을 삭제하시겠습니까?")) return;
    try {
      await api.delete(`/board/${postId}`);
      alert("게시글이 삭제되었습니다.");
      onNavigate("community");
    } catch (error) {
      console.error("게시글 삭제 실패", error);
      alert("삭제 권한이 없거나 오류가 발생했습니다.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      await api.delete(`/board/comments/${commentId}`);
      fetchPostDetail();
    } catch (error) {
      console.error("댓글 삭제 실패", error);
      alert("삭제 실패");
    }
  };

  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;
    try {
      await api.post(`/board/${postId}/comment`, {
        content: commentText,
        parentId: replyToCommentId,
        // 프론트에서 해결: 백엔드가 인식하는 필드명(anonymous)으로 전송
        anonymous: isAnonymous,
        isAnonymous: isAnonymous,
      });

      setCommentText("");
      setIsAnonymous(false);
      setReplyToCommentId(null);
      fetchPostDetail();
    } catch (error) {
      console.error("댓글 등록 실패", error);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  const handleReplyClick = (commentId, authorName) => {
    setReplyToCommentId(commentId);
    setCommentText(`@${authorName} `);
  };

  if (loading) return <div className="post-detail-container">Loading...</div>;
  if (!post) return null;

  // [게시글 삭제 권한] 게시글 작성자는 email로 비교 (백엔드 PostDetailResponse가 email을 반환하므로)
  const isMyPost = currentUser.email && post.username === currentUser.email;

  return (
    <div className="post-detail-container">
      {/* 헤더 */}
      <div className="pd-header">
        <div
          onClick={() => onNavigate("community")}
          style={{ cursor: "pointer" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="pd-header-title">{post.category}</div>

        {/* [수정] 삭제 버튼 스타일 개선 (글자 잘림 방지) */}
        <div
          style={{
            minWidth: "40px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {isMyPost && (
            <div
              onClick={handleDeletePost}
              style={{
                cursor: "pointer",
                color: "#ff4444",
                fontSize: "14px",
                fontWeight: "600",
                whiteSpace: "nowrap",
              }}
            >
              삭제
            </div>
          )}
        </div>
      </div>

      <div className="pd-scroll-area">
        {/* 작성자 정보 */}
        <div className="pd-author-section">
          <div className="pd-avatar">
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "#D9D9D9",
                borderRadius: "50%",
              }}
            ></div>
          </div>
          <div className="pd-author-info">
            <div className="pd-category-badge">{post.category}</div>
            <div className="pd-author-name">{post.username}</div>
          </div>
        </div>

        <div className="pd-title">{post.title}</div>
        <div className="pd-content" style={{ whiteSpace: "pre-wrap" }}>
          {post.content}
        </div>
        <div className="pd-time">
          {new Date(post.createdAt).toLocaleString()}
        </div>

        <div className="pd-stats-bar">
          <div className="pd-stat-item">
            <span>좋아요 {post.likeCount}</span>
          </div>
          <div className="pd-stat-item">
            <span>
              댓글{" "}
              {post.comments
                ? post.comments.reduce(
                    (acc, curr) =>
                      acc + 1 + (curr.children ? curr.children.length : 0),
                    0
                  )
                : 0}
            </span>
          </div>
        </div>

        {/* 댓글 목록 */}
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div key={comment.id}>
              <div className="pd-comment-card">
                <div className="pd-comment-meta">
                  <span className="pd-meta-author">{comment.username}</span>
                  <div
                    className="pd-time"
                    style={{ fontSize: "10px", marginLeft: "auto" }}
                  >
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="pd-comment-body">{comment.content}</div>

                <div
                  style={{ display: "flex", gap: "10px", marginTop: "-10px" }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#a3a3a3",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleReplyClick(comment.id, comment.username)
                    }
                  >
                    답글 달기
                  </div>
                  {/* [수정] 댓글 삭제 권한: 아이디(username)로 비교 */}
                  {currentUser.username &&
                    comment.username === currentUser.username && (
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#ff4444",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        삭제
                      </div>
                    )}
                </div>
              </div>

              {/* 대댓글 렌더링 */}
              {comment.children && comment.children.length > 0 && (
                <div
                  style={{
                    marginLeft: "40px",
                    marginTop: "10px",
                    borderLeft: "2px solid #e5e5e5",
                    paddingLeft: "10px",
                  }}
                >
                  {comment.children.map((reply) => (
                    <div
                      key={reply.id}
                      className="pd-comment-card"
                      style={{ backgroundColor: "#fafafa", marginTop: "8px" }}
                    >
                      <div className="pd-comment-meta">
                        <span className="pd-meta-author">{reply.username}</span>
                        <div
                          className="pd-time"
                          style={{ fontSize: "10px", marginLeft: "auto" }}
                        >
                          {new Date(reply.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="pd-comment-body">{reply.content}</div>

                      {/* [수정] 대댓글 삭제 권한: 아이디(username)로 비교 */}
                      {currentUser.username &&
                        reply.username === currentUser.username && (
                          <div
                            style={{
                              fontSize: "12px",
                              color: "#ff4444",
                              cursor: "pointer",
                              textAlign: "right",
                              marginTop: "-10px",
                            }}
                            onClick={() => handleDeleteComment(reply.id)}
                          >
                            삭제
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="pd-empty-comments">
            <div className="pd-empty-text">첫 댓글을 남겨주세요</div>
          </div>
        )}
        <div style={{ height: "80px" }}></div>
      </div>

      <div className="pd-bottom-bar" style={{ bottom: "20px" }}>
        {replyToCommentId && (
          <div
            style={{
              padding: "8px 16px",
              background: "#f0f0f0",
              fontSize: "12px",
              color: "#666",
              borderRadius: "10px 10px 0 0",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>답글 작성 중...</span>
            <span
              onClick={() => {
                setReplyToCommentId(null);
                setCommentText("");
              }}
              style={{ cursor: "pointer" }}
            >
              ✕ 취소
            </span>
          </div>
        )}
        <div className="pd-input-container">
          <div
            className="pd-anon-toggle"
            onClick={() => setIsAnonymous(!isAnonymous)}
            style={{ cursor: "pointer" }}
          >
            <div
              className="pd-check-icon"
              style={{ background: isAnonymous ? "#27272a" : "#e5e5e5" }}
            >
              {isAnonymous && (
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13.3332 4L5.99984 11.3333L2.6665 8"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span>익명</span>
          </div>
          <input
            className="pd-input-placeholder"
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              background: "transparent",
            }}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={
              replyToCommentId ? "답글을 입력하세요" : "댓글을 달아주세요"
            }
          />
          <div className="pd-submit-btn" onClick={handleSubmitComment}>
            등록
          </div>
        </div>
      </div>
    </div>
  );
}
