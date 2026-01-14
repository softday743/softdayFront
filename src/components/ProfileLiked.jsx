import React, { useState } from "react";
import "../styles/mypage/profile-liked.css";

export function ProfileLiked({ onBack }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts"); // 'posts' | 'comments'

  // 드롭다운 및 상태 관리
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("전체");
  const [sortOrder, setSortOrder] = useState("최신순");
  
  // 신고/차단 팝업을 보여줄 ID 저장
  const [activeReportMenu, setActiveReportMenu] = useState(null);

  // 외부 클릭 시 드롭다운 닫기 위한 Ref
  const categoryRef = useRef(null);
  const sortRef = useRef(null);

  // --- Dummy Data (건드리지 않음) ---
  const [likedPosts] = useState([
    { id: 1, title: "제목", content: "내용", category: "직장생활", author: "작성자 정보", time: "시간(ex, n분 전)", likeCount: 1, commentCount: "댓글", viewCount: "조회수", icon: "🖥️" },
    { id: 2, title: "제목", content: "내용", category: "인간관계", author: "작성자 정보", time: "시간(ex, n분 전)", likeCount: 1, commentCount: "댓글", viewCount: "조회수", icon: "👥" },
    { id: 3, title: "제목", content: "내용", category: "취미/여가", author: "작성자 정보", time: "시간(ex, n분 전)", likeCount: 1, commentCount: "댓글", viewCount: "조회수", icon: "💭" },
  ]);

  const [likedComments] = useState([
    { id: 1, content: "내용", author: "작성자 정보", date: "2025. 12. 20. 19:02", icon: "🍦" },
    { id: 2, content: "내용", author: "작성자 정보", date: "2025. 12. 20. 19:02", icon: "🍦" },
    { id: 3, content: "내용", author: "작성자 정보", date: "2025. 12. 20. 19:02", icon: "🍦" },
  ]);

  // 외부 클릭 감지 로직
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) setShowCategoryMenu(false);
      if (sortRef.current && !sortRef.current.contains(event.target)) setShowSortMenu(false);
      // 점3개 버튼이나 팝업 외 영역 클릭 시 메뉴 닫기
      if (!event.target.closest('.pl-more-dots') && !event.target.closest('.pl-comment-menu')) setActiveReportMenu(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- 데이터 필터링 및 정렬 로직 ---
  const displayPosts = likedPosts
    .filter(post => categoryFilter === "전체" || post.category === categoryFilter)
    .sort((a, b) => {
      if (sortOrder === "최신순") return b.id - a.id;
      return a.id - b.id;
    });

  const displayComments = likedComments.sort((a, b) => {
    if (sortOrder === "최신순") return b.id - a.id;
    return a.id - b.id;
  });

  return (
    <div className="pl-container">
      {/* Header */}
      <div className="pl-back-arrow" onClick={onBack}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <div className="pl-header-title">좋아요</div>

      {/* Tabs */}
      <div className="pl-tabs-container">
        <div className={`pl-tab ${activeTab === "posts" ? "active" : "inactive"}`} onClick={() => setActiveTab("posts")}>게시글</div>
        <div className={`pl-tab ${activeTab === "comments" ? "active" : "inactive"}`} onClick={() => setActiveTab("comments")}>댓글</div>
      </div>

      {/* Filters Area */}
      <div className="pl-filter-bar">
        {/* 게시글 탭에서만 카테고리 필터 노출 */}
        {activeTab === "posts" && (
          <div className="pl-dropdown-wrapper" ref={categoryRef} style={{ position: 'relative' }}>
            <div className="pl-filter-btn" onClick={() => setShowCategoryMenu(!showCategoryMenu)} style={{ cursor: 'pointer' }}>
              {categoryFilter}
            </div>
            {showCategoryMenu && (
              <div className="pl-dropdown-menu" style={{ position: 'absolute', top: '100%', left: 0, background: '#fff', border: '1px solid #ddd', borderRadius: '4px', zIndex: 10, width: '100px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                {["전체", "직장생활", "인간관계", "취미/여가"].map(cat => (
                  <div key={cat} onClick={() => { setCategoryFilter(cat); setShowCategoryMenu(false); }} style={{ padding: '8px', cursor: 'pointer', fontSize: '14px', borderBottom: '1px solid #f0f0f0' }}>{cat}</div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="pl-search-bar">
          <div className="pl-search-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15.75 15.75L11.2501 11.25M12.75 7.5C12.75 10.3995 10.3995 12.75 7.5 12.75C4.6005 12.75 2.25 10.3995 2.25 7.5C2.25 4.6005 4.6005 2.25 7.5 2.25C10.3995 2.25 12.75 4.6005 12.75 7.5Z" stroke="#656565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>

        <div className="pl-dropdown-wrapper" ref={sortRef} style={{ position: 'relative' }}>
          <div className="pl-sort-btn" onClick={() => setShowSortMenu(!showSortMenu)} style={{ cursor: 'pointer' }}>
            {sortOrder}
          </div>
          {showSortMenu && (
            <div className="pl-dropdown-menu" style={{ position: 'absolute', top: '100%', right: 0, background: '#fff', border: '1px solid #ddd', borderRadius: '4px', zIndex: 10, width: '80px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              {["최신순", "오래된 순"].map(sort => (
                <div key={sort} onClick={() => { setSortOrder(sort); setShowSortMenu(false); }} style={{ padding: '8px', cursor: 'pointer', fontSize: '14px', borderBottom: '1px solid #f0f0f0' }}>{sort}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* List Area */}
      <div className="pl-list-bg">
        {/* 게시글 렌더링 */}
        {activeTab === "posts" && displayPosts.map((post) => (
          <div key={post.id} className="pl-card" style={{ position: 'relative' }}>
            <div className="pl-card-icon">
              <svg width="29" height="29" viewBox="0 0 29 29" fill="none"><circle cx="14.5" cy="14.5" r="14" fill="#FFF9EA" stroke="#FFB200" /></svg>
            </div>
            <div className="pl-card-emoji">{post.icon}</div>
            <div className="pl-card-category">{post.category}</div>
            <div className="pl-card-author">{post.author}</div>
            <div className="pl-card-time">{post.time}</div>
            <div className="pl-card-title">{post.title}</div>
            <div className="pl-card-content">{post.content}</div>
            <div className="pl-card-stats">
              <div className="pl-stat-item liked"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M12.0833 2.25C14.725 2.25 16.5 4.76438 16.5 7.11C16.5 11.8603 9.13333 15.75 9 15.75C8.86667 15.75 1.5 11.8603 1.5 7.11C1.5 4.76438 3.275 2.25 5.91667 2.25C7.43333 2.25 8.425 3.01781 9 3.69281C9.575 3.01781 10.5667 2.25 12.0833 2.25Z" fill="#FF3737" stroke="#FF3737" strokeWidth="2" /></svg>{post.likeCount}</div>
              <div className="pl-stat-item comment"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15.75 9C15.75 12.7279 12.7279 15.75 9 15.75C8.10214 15.75 7.24523 15.5747 6.46162 15.2565L3.07857 15.6119C2.79914 15.6585 2.65942 15.6818 2.55839 15.6384C2.31824 15.3406 2.34152 15.2009 2.3881 14.9214L2.83283 12.253C2.86666 11.9879 2.86665 11.9271 2.8485 11.824C2.74355 11.5384 2.4253 10.7548 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25C12.7279 2.25 15.75 5.27208 15.75 9Z" stroke="#959595" strokeWidth="2" /></svg>{post.commentCount}</div>
              <div className="pl-stat-item view"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z" stroke="#959595" strokeWidth="2" /><path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="#959595" strokeWidth="2" /></svg>{post.viewCount}</div>
            </div>
            <div className="pl-more-dots" onClick={() => setActiveReportMenu(activeReportMenu === `p-${post.id}` ? null : `p-${post.id}`)} style={{ cursor: 'pointer' }}>
              <svg width="3" height="14" viewBox="0 0 3 14" fill="none"><path d="M1.5 7.5C1.91421 7.5 2.25 7.16421 2.25 6.75C2.25 6.33579 1.91421 6 1.5 6C1.08579 6 0.75 6.33579 0.75 6.75Z" stroke="black" strokeWidth="1.5"/><path d="M1.5 12.75C1.91421 12.75 2.25 12.4142 2.25 12C2.25 11.5858 1.91421 11.25 1.5 11.25C1.08579 11.25 0.75 11.5858 0.75 12Z" stroke="black" strokeWidth="1.5"/><path d="M1.5 2.25C1.91421 2.25 2.25 1.91421 2.25 1.5C2.25 1.08579 1.91421 0.75 1.5 0.75C1.08579 0.75 0.75 1.08579 0.75 1.5Z" stroke="black" strokeWidth="1.5"/></svg>
            </div>
            {activeReportMenu === `p-${post.id}` && (
              <div className="pl-edit-popup" style={{ position: 'absolute', top: '40px', right: '10px', background: '#fff', border: '1px solid #ddd', borderRadius: '4px', zIndex: 11, padding: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <div style={{ padding: '8px 15px', cursor: 'pointer', borderBottom: '1px solid #eee' }} onClick={() => alert('신고되었습니다.')}>신고</div>
                <div style={{ padding: '8px 15px', cursor: 'pointer' }} onClick={() => alert('차단되었습니다.')}>차단</div>
              </div>
            )}
          </div>
        ))}

        {/* 댓글 렌더링 */}
        {activeTab === "comments" && displayComments.map((comment) => (
          <div key={comment.id} className="pl-comment-card" style={{ position: 'relative' }}>
            <div className="pl-comment-profile-bg">
              <svg width="27" height="27" viewBox="0 0 27 27" fill="none"><circle cx="13.5" cy="13.5" r="13" fill="#FFF9EA" stroke="#FD9800" /></svg>
            </div>
            <div className="pl-comment-emoji">{comment.icon}</div>
            <div className="pl-comment-author">{comment.author}</div>
            <div className="pl-comment-content">{comment.content}</div>
            <div className="pl-comment-date">{comment.date}</div>
            <div className="pl-comment-actions">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10.3069 1.91992C12.5602 1.91992 14.0743 4.06468 14.0743 6.0655C14.0743 10.1175 7.79052 13.4354 7.67679 13.4354C7.56306 13.4354 1.2793 10.1175 1.2793 6.0655C1.2793 4.06468 2.79337 1.91992 5.04671 1.91992C6.34043 1.91992 7.18632 2.57487 7.67679 3.15064C8.16727 2.57487 9.01316 1.91992 10.3069 1.91992Z" fill="#FF4646" stroke="#FF4646" strokeWidth="1.706"/></svg>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.4354 7.67766C13.4354 10.8576 10.8576 13.4354 7.67766 13.4354C6.91179 13.4354 6.18084 13.2859 5.51243 13.0144C4.90285 12.9382 2.62669 13.3176 2.03772 12.7286L2.41708 10.4525C2.44593 10.2263 2.43044 10.0865 2.34092 9.8429C2.06945 9.17448 1.91992 8.44353 1.91992 7.67766C1.91992 4.49775 4.49775 1.91992 7.67766 1.91992C10.8576 1.91992 13.4354 4.49775 13.4354 7.67766Z" stroke="#959595" strokeWidth="1.706"/></svg>
            </div>
            <div className="pl-comment-menu" onClick={() => setActiveReportMenu(activeReportMenu === `c-${comment.id}` ? null : `c-${comment.id}`)} style={{ cursor: 'pointer' }}>
              <svg width="3" height="14" viewBox="0 0 3 14" fill="none"><path d="M1.5 7.5C1.91421 7.5 2.25 7.16421 2.25 6.75Z" stroke="black" strokeWidth="1.5"/><path d="M1.5 12.75C1.91421 12.75 2.25 12.4142 2.25 12Z" stroke="black" strokeWidth="1.5"/><path d="M1.5 2.25C1.91421 2.25 2.25 1.91421 2.25 1.5Z" stroke="black" strokeWidth="1.5"/></svg>
            </div>
            {activeReportMenu === `c-${comment.id}` && (
              <div className="pl-edit-popup" style={{ position: 'absolute', top: '40px', right: '10px', background: '#fff', border: '1px solid #ddd', borderRadius: '4px', zIndex: 11, padding: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <div style={{ padding: '8px 15px', cursor: 'pointer', borderBottom: '1px solid #eee' }} onClick={() => alert('신고되었습니다.')}>신고</div>
                <div style={{ padding: '8px 15px', cursor: 'pointer' }} onClick={() => alert('차단되었습니다.')}>차단</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}