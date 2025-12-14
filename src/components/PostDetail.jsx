import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import "./post-detail.css";

export function PostDetail({ onNavigate, postId }) {
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false); // 익명 체크 상태
  const [loading, setLoading] = useState(true);

  // postId가 변경되면 상세 내용 다시 불러오기
  useEffect(() => {
    if (postId) {
      fetchPostDetail();
    }
  }, [postId]);

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

  // 댓글 작성 핸들러
  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;

    try {
      await api.post(`/board/${postId}/comment`, {
        content: commentText,
        parentId: null, // 대댓글이 아니므로 null
        isAnonymous: isAnonymous, // [핵심] 익명 여부 전송
      });

      setCommentText(""); // 입력창 초기화
      setIsAnonymous(false); // 익명 체크 초기화
      fetchPostDetail(); // 댓글 목록 갱신을 위해 재조회
    } catch (error) {
      console.error("댓글 등록 실패", error);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  if (loading)
    return (
      <div
        className="post-detail-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </div>
    );
  if (!post) return null;

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
        {/* String 카테고리 표시 */}
        <div className="pd-header-title">{post.category}</div>
        <div>
          {/* 메뉴 아이콘 (필요시 구현) */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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

        {/* 게시글 본문 */}
        <div className="pd-title">{post.title}</div>
        <div className="pd-content" style={{ whiteSpace: "pre-wrap" }}>
          {post.content}
        </div>
        <div className="pd-time">
          {new Date(post.createdAt).toLocaleString()}
        </div>

        {/* 통계 바 */}
        <div className="pd-stats-bar">
          <div className="pd-stat-item">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path
                d="M16.5829 3.08789C20.2083 3.08789 22.6442 6.53856 22.6442 9.75764C22.6442 16.2769 12.5344 21.615 12.3514 21.615C12.1684 21.615 2.05859 16.2769 2.05859 9.75764C2.05859 6.53856 4.49456 3.08789 8.11992 3.08789C10.2014 3.08789 11.5623 4.14162 12.3514 5.06797C13.1405 4.14162 14.5015 3.08789 16.5829 3.08789Z"
                stroke="#959595"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>좋아요 {post.likeCount}</span>
          </div>
          <div className="pd-stat-item">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path
                d="M21.615 12.3514C21.615 17.4675 17.4675 21.615 12.3514 21.615C11.1192 21.615 9.94322 21.3744 8.86781 20.9376C8.66199 20.854 8.55908 20.8122 8.47589 20.7936C8.39451 20.7754 8.33429 20.7687 8.2509 20.7687C8.16565 20.7687 8.07279 20.7841 7.88707 20.8151L4.225 21.4254C3.84151 21.4893 3.64977 21.5213 3.51111 21.4618C3.38976 21.4098 3.29306 21.3131 3.24101 21.1917C3.18154 21.0531 3.21349 20.8613 3.27741 20.4778L3.88775 16.8158C3.91871 16.6301 3.93418 16.5372 3.93417 16.4519C3.93416 16.3685 3.92749 16.3083 3.90925 16.227C3.89061 16.1438 3.84881 16.0409 3.76522 15.835C3.32847 14.7596 3.08789 13.5836 3.08789 12.3514C3.08789 7.23531 7.23531 3.08789 12.3514 3.08789C17.4675 3.08789 21.615 7.23531 21.615 12.3514Z"
                stroke="#959595"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>댓글 {post.comments ? post.comments.length : 0}</span>
          </div>
          <div className="pd-stat-item">
            <span>저장</span>
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path
                d="M19.5473 21.6043L12.3456 16.4603L5.14404 21.6043V5.14354C5.14404 4.59783 5.36083 4.07447 5.7467 3.68859C6.13258 3.30272 6.65593 3.08594 7.20164 3.08594H17.4897C18.0354 3.08594 18.5587 3.30272 18.9446 3.68859C19.3305 4.07447 19.5473 4.59783 19.5473 5.14354V21.6043Z"
                stroke="#959595"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* 댓글 목록 */}
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div key={comment.id} className="pd-comment-card">
              <div className="pd-comment-meta">
                {/* 백엔드에서 익명 댓글은 username이 "익명"으로 내려옴 */}
                <span className="pd-meta-author">{comment.username}</span>
                <div
                  className="pd-time"
                  style={{ fontSize: "10px", marginLeft: "auto" }}
                >
                  {new Date(comment.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="pd-comment-body">{comment.content}</div>
            </div>
          ))
        ) : (
          <div className="pd-empty-comments">
            <div className="pd-empty-text">첫 댓글을 남겨주세요</div>
          </div>
        )}
        {/* 하단 여백 (입력창 가림 방지) */}
        <div style={{ height: "80px" }}></div>
      </div>

      {/* 하단 댓글 입력창 */}
      <div className="pd-bottom-bar" style={{ bottom: "20px" }}>
        <div className="pd-input-container">
          {/* 익명 토글 버튼 */}
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

          {/* 입력 필드 */}
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
            placeholder="댓글을 달아주세요"
          />

          {/* 전송 버튼 */}
          <div className="pd-submit-btn" onClick={handleSubmitComment}>
            댓글
          </div>
        </div>
      </div>
    </div>
  );
}
