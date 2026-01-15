import React, { useState, useEffect } from "react";
import "../styles/community/post-detail.css";
// boardApi를 사용하여 실제 좋아요/취소 및 데이터를 처리합니다.
import { boardApi } from "../api/axiosConfig";

export function PostDetail({ onBack, postId, userName }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reportStep, setReportStep] = useState("none");
  const [blockStep, setBlockStep] = useState("none");

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // 상호작용 상태
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const [comments, setComments] = useState([]);

  // 1. 게시글 상세 정보 불러오기
  const fetchPostDetail = async () => {
    try {
      setLoading(true);
      const response = await boardApi.getPostDetail(postId);
      const data = response.data;

      setPost(data);
      setIsLiked(data.hasLiked || false);
      setLikeCount(data.likeCount || 0);
      setIsSaved(data.hasSaved || false);
      setComments(data.commentList || data.comments || []);
    } catch (error) {
      console.error("게시글 로딩 실패:", error);
      alert("데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, [postId]);

  // 2. 좋아요 토글 (두 번 누르면 취소)
  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        await boardApi.removeLike(postId);
        setLikeCount((prev) => Math.max(0, prev - 1));
        setIsLiked(false);
      } else {
        await boardApi.addLike(postId);
        setLikeCount((prev) => prev + 1);
        setIsLiked(true);
      }
    } catch (error) {
      if (error.response?.status === 403) {
        alert("본인 게시글에는 좋아요를 누를 수 없습니다.");
      } else {
        alert("요청 처리에 실패했습니다.");
      }
    }
  };

  // 3. 저장(북마크) 토글 - 이미지처럼 상태 변화
  const handleSaveToggle = async () => {
    try {
      if (isSaved) {
        // [삭제] API 호출: DELETE /api/board/{postId}/save
        await boardApi.unsavePost(postId);
        setIsSaved(false);
      } else {
        // [등록] API 호출: POST /api/board/{postId}/save
        await boardApi.savePost(postId);
        setIsSaved(true);
      }
    } catch (error) {
      alert("저장 처리에 실패했습니다.");
    }
  };

  // 4. 댓글 등록
  const handleCommentSubmit = async () => {
    if (!commentInput.trim()) return;
    try {
      const commentData = {
        content: commentInput,
        parentId: null,
        isAnonymous: isAnonymous
      };
      await boardApi.createComment(postId, commentData);
      setCommentInput(""); 
      fetchPostDetail(); 
    } catch (error) {
      alert("댓글 등록에 실패했습니다.");
    }
  };

  const isOwner = post?.username === userName;

  if (loading) return <div className="pd-loading">로딩 중...</div>;
  if (!post) return <div className="pd-error">게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="post-detail-container">
      <div className="pd-scroll-area">
        {/* Header - 스타일 유지 */}
        <div className="pd-header">
          <div className="pd-back-arrow" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div className="pd-header-title">{post.category || "커뮤니티"}</div>
          <div className="pd-menu-dots" onClick={() => setMenuOpen(!menuOpen)}>⋮</div>
        </div>

        {/* 메뉴 드롭다운 */}
        {menuOpen && (
          <div className="pd-menu-dropdown">
            {isOwner ? (
              <>
                <div className="pd-menu-item" onClick={() => setMenuOpen(false)}>수정</div>
                <div className="pd-menu-item red" onClick={async () => {
                  if (window.confirm("정말 삭제하시겠습니까?")) {
                    await boardApi.deletePost(postId);
                    onBack();
                  }
                }}>삭제</div>
              </>
            ) : (
              <>
                <div className="pd-menu-item">신고</div>
                <div className="pd-menu-item">차단</div>
              </>
            )}
          </div>
        )}

        {/* 게시글 내용 */}
        <div className="pd-post-content-wrap">
          <div className="pd-post-info-header">
            <div className="pd-avatar-circle">
               <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                 <circle cx="19" cy="19" r="18.5" fill="#FFF9EA" stroke="#FD9800"/>
               </svg>
               <div className="pd-avatar-emoji">💻</div>
            </div>
            <div className="pd-author">{post.isAnonymous ? "익명" : (post.username?.split('@')[0] || "익명")}</div>
            <div className="pd-category-badge">{post.category}</div>
          </div>

          <div className="pd-title">{post.title}</div>
          <div className="pd-content">{post.content}</div>

          <div className="pd-post-stats-row">
            <div className="pd-time-text">{new Date(post.createdAt).toLocaleString()}</div>
            <div className="pd-stats-right">
              <div className="pd-view-count">조회수 {post.viewCount}</div>
            </div>
          </div>
        </div>

        {/* 액션 바 - 이미지와 동일한 SVG 적용 */}
        <div className="pd-action-bar">
          {/* 좋아요 */}
          <div className="pd-action-item" onClick={handleLikeToggle}>
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M16.5829 3.08789C20.2083 3.08789 22.6442 6.53856 22.6442 9.75764C22.6442 16.2769 12.5344 21.615 12.3514 21.615C12.1684 21.615 2.05859 16.2769 2.05859 9.75764C2.05859 6.53856 4.49456 3.08789 8.11992 3.08789C10.2014 3.08789 11.5623 4.14162 12.3514 5.06797C13.1405 4.14162 14.5015 3.08789 16.5829 3.08789Z" 
                stroke={isLiked ? "#EF4444" : "#959595"} strokeWidth="2.5" fill={isLiked ? "#EF4444" : "none"}/>
            </svg>
            <span className={`pd-action-text ${isLiked ? "active-red" : ""}`}>
              {likeCount > 0 ? likeCount : "좋아요"}
            </span>
          </div>
          
          {/* 댓글 */}
          <div className="pd-action-item">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
               <path d="M21.615 12.3514C21.615 17.4675 17.4675 21.615 12.3514 21.615C11.1192 21.615 9.94322 21.3744 8.86781 20.9376C8.66199 20.854 8.55908 20.8122 8.47589 20.7936C8.39451 20.7754 8.33429 20.7687 8.2509 20.7687C8.16565 20.7687 8.07279 20.7841 7.88707 20.8151L4.225 21.4254C3.84151 21.4893 3.64977 21.5213 3.51111 21.4618C3.38976 21.4098 3.29306 21.3131 3.24101 21.1917C3.18154 21.0531 3.21349 20.8613 3.27741 20.4778L3.88775 16.8158C3.91871 16.6301 3.93418 16.5372 3.93417 16.4519C3.93416 16.3685 3.92749 16.3083 3.90925 16.227C3.89061 16.1438 3.84881 16.0409 3.76522 15.835C3.32847 14.7596 3.08789 13.5836 3.08789 12.3514C3.08789 7.23531 7.23531 3.08789 12.3514 3.08789C17.4675 3.08789 21.615 7.23531 21.615 12.3514Z" stroke="#959595" strokeWidth="2.5"/>
            </svg>
            <span className="pd-action-text">{comments.length > 0 ? comments.length : "댓글"}</span>
          </div>

          {/* 저장 (이미지 속 책갈피 아이콘) */}
          <div className="pd-action-item" onClick={handleSaveToggle}>
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M19.5468 21.6043L12.3452 16.4603L5.14355 21.6043V5.14354C5.14355 4.59783 5.36034 4.07447 5.74621 3.68859C6.13209 3.30272 6.65545 3.08594 7.20116 3.08594H17.4892C18.0349 3.08594 18.5582 3.30272 18.9441 3.68859C19.33 4.07447 19.5468 4.59783 19.5468 5.14354V21.6043Z" 
                stroke={isSaved ? "#F59E0B" : "#959595"} strokeWidth="2.5" fill={isSaved ? "#F59E0B" : "none"}/>
            </svg>
            <span className={`pd-action-text ${isSaved ? "active-yellow" : ""}`}>저장</span>
          </div>
        </div>

        {/* 댓글 목록 */}
        <div className="pd-comment-section">
          <div className="pd-comment-header-title">댓글 {comments.length}개</div>
          <div className="pd-comment-list">
            {comments.map(comment => (
              <div key={comment.id} className="pd-comment-item">
                <div className="pd-comment-author">{comment.isAnonymous ? "익명" : (comment.username || "익명")}</div>
                <div className="pd-comment-content">{comment.content}</div>
                <div className="pd-comment-time">{new Date(comment.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 댓글 입력창 - 이미지와 동일한 체크박스 스타일 */}
      <div className="pd-comment-input-container">
        <div onClick={() => setIsAnonymous(!isAnonymous)} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
          <div className={`pd-checkbox ${isAnonymous ? "checked" : ""}`} style={{ 
            backgroundColor: isAnonymous ? "#FD9800" : "transparent",
            border: isAnonymous ? "none" : "1.5px solid #ccc",
            width: "18px", height: "18px", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" 
          }}>
            {isAnonymous && <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round"/></svg>}
          </div>
          <span style={{ marginLeft: "6px", fontSize: "14px", color: isAnonymous ? "#FD9800" : "#666", fontWeight: "600" }}>익명</span>
        </div>
        
        <input 
          type="text" 
          className="pd-input-field" 
          placeholder="댓글을 달아주세요" 
          value={commentInput} 
          onChange={(e) => setCommentInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
          style={{ flex: 1, margin: "0 12px", padding: "10px 15px", border: "1px solid #eee", borderRadius: "25px", fontSize: "14px" }}
        />
        <div className="pd-submit-btn" onClick={handleCommentSubmit} style={{ 
          cursor: "pointer", backgroundColor: "#f5f5f5", padding: "8px 15px", borderRadius: "20px", fontSize: "14px", color: "#666", fontWeight: "bold" 
        }}>등록</div>
      </div>
    </div>
  );
}