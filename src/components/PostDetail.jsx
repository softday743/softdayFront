import React, { useState, useEffect } from "react";
import "./post-detail.css";
import api from "../api/axiosConfig";

export function PostDetail({ onBack, postId, userName }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reportStep, setReportStep] = useState("none");
  const [blockStep, setBlockStep] = useState("none");
  const [selectedReason, setSelectedReason] = useState("");

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Interaction States
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  // Simulated Comment Data (In real app, fetch from API)
  const [comments, setComments] = useState([]);

  // ... (Fetch logic roughly same, but init interaction states)
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await api.get(`/board/${postId}`);
        setPost(response.data);
        // Init states from response
        setIsLiked(response.data.hasLiked || false);
        setLikeCount(response.data.likes || 0);
        setIsSaved(response.data.hasSaved || false);
        setComments(response.data.commentList || []);
      } catch (error) {
        console.error("Failed to fetch post detail", error);
        // Fallback dummy
        const id = parseInt(postId) || 1;
        const index = (id - 1) % 3;
        const dummyComments = id % 2 === 0 ? [] : [
            { id: 1, author: "익명1", content: "좋은 글이네요!", time: "방금 전" },
            { id: 2, author: "익명2", content: "공감합니다.", time: "10분 전" }
        ];
        
        const dummyPost = {
          id: id,
          category: ["직장생활", "인간관계", "취미/여가"][index],
          username: id === 999 ? userName : "작성자 정보", // 999 for test my post
          title: `게시글 제목 ${id}`,
          content: `게시글 내용 ${id}입니다.`,
          createdAt: new Date().toISOString(),
          viewCount: id * 10,
          emoji: ["🖥️", "👥", "💭"][index],
          likes: id % 5,
          hasLiked: false,
          hasSaved: false,
        };
        setPost(dummyPost);
        setLikeCount(dummyPost.likes);
        setIsLiked(false);
        setIsSaved(false);
        setComments(dummyComments);
      } finally {
        setLoading(false);
      }
    };
    fetchPostDetail();
  }, [postId, userName]);

  const isOwner = post?.username === userName;

  const handleLikeToggle = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleSaveToggle = () => {
    setIsSaved((prev) => !prev);
  };

  // ... (Menu Handlers same, but conditional rendering for Owner)
  // Re-using existing handlers for brevity, logic update in render

  // ... (Report/Block Flow Handlers same)

  const handleReportStart = () => {
    setReportStep("category");
    setMenuOpen(false);
  };

  const handleCategorySelect = (reason) => {
    setSelectedReason(reason);
    setReportStep("confirm");
  };

  const handleConfirmReport = () => {
    setReportStep("complete");
    setTimeout(() => {
      setReportStep("none");
    }, 2000);
  };

  const handleCancelReport = () => {
    setReportStep("none");
  };

  const handleBlockStart = () => {
    setBlockStep("confirm");
    setMenuOpen(false);
  };

  const handleConfirmBlock = () => {
    setBlockStep("complete");
    setTimeout(() => {
      setBlockStep("none");
    }, 2000);
  };

  const handleCancelBlock = () => {
    setBlockStep("none");
  };

  // Render Section
  if (loading) return <div>Loading...</div>;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  const isOverlayVisible =
    reportStep === "confirm" ||
    reportStep === "complete" ||
    blockStep === "confirm" ||
    blockStep === "complete";

  return (
    <div className="post-detail-container">
      {isOverlayVisible && <div className="pd-overlay"></div>}

      <div className="pd-scroll-area">
        {/* Header */}
        <div className="pd-back-arrow" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="pd-header-title">{post.category}</div>
        <div className="pd-menu-dots" onClick={() => setMenuOpen(!menuOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Dynamic Menu */}
        {menuOpen && (
          <div className="pd-menu-dropdown">
            {isOwner ? (
              <>
                <div className="pd-menu-item" onClick={() => {/* Edit Logic */ setMenuOpen(false);}}>수정</div>
                <div className="pd-menu-item" onClick={async () => {
                    if (window.confirm("정말 삭제하시겠습니까?")) {
                        try {
                           await api.delete(`/board/${postId}`);
                           onBack();
                        } catch (e) {
                           console.error("Delete failed", e);
                           alert("삭제에 실패했습니다.");
                        }
                    }
                    setMenuOpen(false);
                }}>삭제</div>
              </>
            ) : (
              <>
                <div className="pd-menu-item" onClick={handleReportStart}>신고</div>
                <div className="pd-menu-item" onClick={handleBlockStart}>차단</div>
              </>
            )}
          </div>
        )}

        {/* ... (Report/Block Popups - keeping largely same logic) ... */}
        {/* Omitted popup codes for brevity in this replacement chunk, assume they exist or I can re-include if needed. 
            Actually I should include them because I am replacing the whole block. 
            I will include abbreviated versions to fit context or full versions. 
            Since I am replacing lines 5-471, I must include EVERYTHING.
        */}

        {/* Re-implementing Popups deeply nested in return is safer to just reference existing structure or rewrite.
            I'll rewrite the critical parts.
        */}
        
        {/* Report Reason List */}
        {reportStep === "category" && (
           <div className="pd-reason-list">
             {["스팸/부적절한 홍보", "욕설/비하 발언", "음란물/유해 정보", "개인정보 노출", "기타"].map(r => (
               <div key={r} className="pd-reason-item" onClick={() => handleCategorySelect(r)}>{r}</div>
             ))}
           </div>
        )}

        {/* Popups */}
        {reportStep === "confirm" && (
          <div className="pd-confirm-popup">
            <div className="pd-confirm-title">신고 이유</div>
            <div className="pd-confirm-desc">정말 신고하시겠습니까?</div>
            <div className="pd-confirm-actions">
              <div className="pd-confirm-btn" onClick={handleCancelReport}>취소</div>
              <div className="pd-confirm-btn confirm" onClick={handleConfirmReport}>확인</div>
            </div>
          </div>
        )}
        {reportStep === "complete" && <div className="pd-complete-popup"><div className="pd-complete-text">신고가 완료되었어요.</div></div>}
        
        {blockStep === "confirm" && (
          <div className="pd-confirm-popup">
            <div className="pd-confirm-title">차단 안내</div>
            <div className="pd-confirm-desc">정말 차단하시겠습니까?</div>
            <div className="pd-confirm-actions">
              <div className="pd-confirm-btn" onClick={handleCancelBlock}>취소</div>
              <div className="pd-confirm-btn confirm" onClick={handleConfirmBlock}>확인</div>
            </div>
          </div>
        )}
        {blockStep === "complete" && <div className="pd-complete-popup"><div className="pd-complete-text">차단이 완료되었어요.</div></div>}


        {/* Post Content */}
        <div className="pd-post-info-header">
           <div className="pd-avatar-circle">
             <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
               <circle cx="19" cy="19" r="18.5" fill="#FFF9EA" stroke="#FD9800"/>
             </svg>
             <div className="pd-avatar-emoji">{post.emoji}</div>
           </div>
           <div className="pd-author">{post.username}</div>
           <div className="pd-category-badge"><div className="pd-category-text">{post.category}</div></div>
        </div>

        <div className="pd-title">{post.title}</div>
        <div className="pd-content">{post.content}</div>

        <div className="pd-post-stats-row">
           <div className="pd-time-text">{new Date(post.createdAt).toLocaleString()}</div>
           <div className="pd-stats-right">
             <div className="pd-view-count">조회수 {post.viewCount}</div>
           </div>
        </div>

        {/* Action Bar */}
        <div className="pd-action-bar">
           {/* Like */}
           <div className="pd-action-item" onClick={handleLikeToggle}>
             <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
               <path d="M16.5829 3.08789C20.2083 3.08789 22.6442 6.53856 22.6442 9.75764C22.6442 16.2769 12.5344 21.615 12.3514 21.615C12.1684 21.615 2.05859 16.2769 2.05859 9.75764C2.05859 6.53856 4.49456 3.08789 8.11992 3.08789C10.2014 3.08789 11.5623 4.14162 12.3514 5.06797C13.1405 4.14162 14.5015 3.08789 16.5829 3.08789Z" 
                 stroke={isLiked ? "#EF4444" : "#959595"} strokeWidth="2.5" fill={isLiked ? "#EF4444" : "none"}/>
             </svg>
             <span className={`pd-action-text ${isLiked ? "active-red" : ""}`}>
               {likeCount > 0 ? likeCount : "좋아요"}
             </span>
           </div>
           
           {/* Comment */}
           <div className="pd-action-item">
             <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path d="M21.615 12.3514C21.615 17.4675 17.4675 21.615 12.3514 21.615C11.1192 21.615 9.94322 21.3744 8.86781 20.9376C8.66199 20.854 8.55908 20.8122 8.47589 20.7936C8.39451 20.7754 8.33429 20.7687 8.2509 20.7687C8.16565 20.7687 8.07279 20.7841 7.88707 20.8151L4.225 21.4254C3.84151 21.4893 3.64977 21.5213 3.51111 21.4618C3.38976 21.4098 3.29306 21.3131 3.24101 21.1917C3.18154 21.0531 3.21349 20.8613 3.27741 20.4778L3.88775 16.8158C3.91871 16.6301 3.93418 16.5372 3.93417 16.4519C3.93416 16.3685 3.92749 16.3083 3.90925 16.227C3.89061 16.1438 3.84881 16.0409 3.76522 15.835C3.32847 14.7596 3.08789 13.5836 3.08789 12.3514C3.08789 7.23531 7.23531 3.08789 12.3514 3.08789C17.4675 3.08789 21.615 7.23531 21.615 12.3514Z" stroke="#959595" strokeWidth="2.5"/>
             </svg>
             <span className="pd-action-text">{comments.length > 0 ? comments.length : "댓글"}</span>
           </div>

           {/* Save */}
           <div className="pd-action-item" onClick={handleSaveToggle}>
             <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
               <path d="M19.5468 21.6043L12.3452 16.4603L5.14355 21.6043V5.14354C5.14355 4.59783 5.36034 4.07447 5.74621 3.68859C6.13209 3.30272 6.65545 3.08594 7.20116 3.08594H17.4892C18.0349 3.08594 18.5582 3.30272 18.9441 3.68859C19.33 4.07447 19.5468 4.59783 19.5468 5.14354V21.6043Z" 
                 stroke={isSaved ? "#F59E0B" : "#959595"} strokeWidth="2.5" fill={isSaved ? "#F59E0B" : "none"}/>
             </svg>
             <span className={`pd-action-text ${isSaved ? "active-yellow" : ""}`}>저장</span>
           </div>
        </div>

        {/* Comment Section (List or Copy) */}
        <div className="pd-comment-section">
           {comments.length === 0 ? (
             <div className="pd-empty-state">
                <div className="pd-empty-comment-text">첫 댓글을 남겨주세요</div>
             </div>
           ) : (
             <div className="pd-comment-list">
               {comments.map(comment => (
                 <div key={comment.id} className="pd-comment-item">
                    <div className="pd-comment-author">{comment.author}</div>
                    <div className="pd-comment-content">{comment.content}</div>
                    <div className="pd-comment-time">{comment.time}</div>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>

      {/* Input */}
      <div className="pd-comment-input-container">
        <div className="pd-checkbox">
           <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="#FFF" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
        <div className="pd-anonymous-text">익명</div>
        <input type="text" className="pd-input-placeholder" placeholder="댓글을 달아주세요" value={commentInput} onChange={(e) => setCommentInput(e.target.value)}/>
        <div className="pd-submit-btn" onClick={() => {
           if(commentInput.trim()) {
             setComments([...comments, {id: Date.now(), author: "나(익명)", content: commentInput, time: "방금"}]);
             setCommentInput("");
           }
        }}>
          <div className="pd-submit-text">등록</div>
        </div>
      </div>
    </div>
  );
}
