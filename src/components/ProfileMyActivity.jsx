import React, { useState, useEffect, useRef } from "react";
import "./profile-my-activity.css";
import api from "../api/axiosConfig";

export function ProfileMyActivity({ onBack }) {
  const [activeTab, setActiveTab] = useState("posts"); // 'posts' | 'comments'
  
  // 드롭다운 및 상태 관리
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("전체");
  const [sortOrder, setSortOrder] = useState("최신순");
  
  // 수정/삭제 메뉴를 보여줄 ID 저장 (게시글/댓글 구분 위해 프리픽스 사용 가능)
  const [activeEditMenu, setActiveEditMenu] = useState(null);

  // 외부 클릭 시 드롭다운 닫기 위한 Ref
  const categoryRef = useRef(null);
  const sortRef = useRef(null);

  // --- Dummy Data ---
  const [myPosts, setMyPosts] = useState([
    { id: 1, title: "제목", content: "내용", category: "직장생활", author: "작성자 정보", time: "1분 전", likeCount: 10, commentCount: 1, viewCount: "조회수", icon: "🖥️" },
    { id: 2, title: "제목", content: "내용", category: "인간관계", author: "작성자 정보", time: "5분 전", likeCount: 5, commentCount: "댓글", viewCount: "조회수", icon: "👥" },
    { id: 3, title: "제목", content: "내용", category: "취미/여가", author: "작성자 정보", time: "10분 전", likeCount: 2, commentCount: "댓글", viewCount: "조회수", icon: "💭" },
  ]);

  const [myComments, setMyComments] = useState([
    { id: 1, content: "댓글 내용 1", author: "작성자 정보", date: "2025. 12. 20. 19:02", icon: "🍦", likeCount: 2 },
    { id: 2, content: "댓글 내용 2", author: "작성자 정보", date: "2025. 12. 20. 19:05", icon: "🍦", likeCount: 0 },
    { id: 3, content: "댓글 내용 3", author: "작성자 정보", date: "2025. 12. 20. 19:10", icon: "🍦", likeCount: 5 },
  ]);

  // 외부 클릭 감지 로직
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) setShowCategoryMenu(false);
      if (sortRef.current && !sortRef.current.contains(event.target)) setShowSortMenu(false);
      if (!event.target.closest('.pma-more-dots') && !event.target.closest('.pma-comment-menu')) setActiveEditMenu(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const endpoint = activeTab === "posts" ? "/user/posts" : "/user/comments";
        const response = await api.get(endpoint);
        if (response.data && response.data.length > 0) {
          if (activeTab === "posts") setMyPosts(response.data);
          else setMyComments(response.data);
        }
      } catch (error) {
        console.error("Fetch failed, using dummy data.", error);
      }
    };
    fetchActivity();
  }, [activeTab]);

  // --- 데이터 필터링 및 정렬 계산 ---
  const displayPosts = myPosts
    .filter(post => categoryFilter === "전체" || post.category === categoryFilter)
    .sort((a, b) => {
      if (sortOrder === "최신순") return b.id - a.id;
      return a.id - b.id;
    });

  const displayComments = myComments.sort((a, b) => {
    if (sortOrder === "최신순") return b.id - a.id;
    return a.id - b.id;
  });

  return (
    <div className="pma-container">
      {/* Header */}
      <div className="pma-back-arrow" onClick={onBack}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <div className="pma-header-title">내가 쓴 글</div>

      {/* Tabs */}
      <div className="pma-tabs-container">
        <div className={`pma-tab ${activeTab === "posts" ? "active" : "inactive"}`} onClick={() => setActiveTab("posts")}>게시글</div>
        <div className={`pma-tab ${activeTab === "comments" ? "active" : "inactive"}`} onClick={() => setActiveTab("comments")}>댓글</div>
      </div>

      {/* Filters Area */}
      <div className="pma-filter-bar">
        {/* 게시글 탭일 때만 카테고리 필터 노출 */}
        {activeTab === "posts" && (
          <div className="pma-dropdown-wrapper" ref={categoryRef} style={{ position: 'relative' }}>
            <div className="pma-filter-btn" onClick={() => setShowCategoryMenu(!showCategoryMenu)} style={{ cursor: 'pointer' }}>
              {categoryFilter}
            </div>
            {showCategoryMenu && (
              <div className="pma-dropdown-menu" style={{ position: 'absolute', top: '100%', left: 0, background: '#fff', border: '1px solid #ddd', borderRadius: '4px', zIndex: 10, width: '100px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                {["전체", "직장생활", "인간관계", "취미/여가"].map(cat => (
                  <div key={cat} onClick={() => { setCategoryFilter(cat); setShowCategoryMenu(false); }} style={{ padding: '8px', cursor: 'pointer', fontSize: '14px', borderBottom: '1px solid #f0f0f0' }}>{cat}</div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="pma-search-bar">
          <div className="pma-search-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15.75 15.75L11.2501 11.25M12.75 7.5C12.75 10.3995 10.3995 12.75 7.5 12.75C4.6005 12.75 2.25 10.3995 2.25 7.5C2.25 4.6005 4.6005 2.25 7.5 2.25C10.3995 2.25 12.75 4.6005 12.75 7.5Z" stroke="#656565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>

        <div className="pma-dropdown-wrapper" ref={sortRef} style={{ position: 'relative' }}>
          <div className="pma-sort-btn" onClick={() => setShowSortMenu(!showSortMenu)} style={{ cursor: 'pointer' }}>
            {sortOrder}
          </div>
          {showSortMenu && (
            <div className="pma-dropdown-menu" style={{ position: 'absolute', top: '100%', right: 0, background: '#fff', border: '1px solid #ddd', borderRadius: '4px', zIndex: 10, width: '80px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              {["최신순", "오래된 순"].map(sort => (
                <div key={sort} onClick={() => { setSortOrder(sort); setShowSortMenu(false); }} style={{ padding: '8px', cursor: 'pointer', fontSize: '14px', borderBottom: '1px solid #f0f0f0' }}>{sort}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* List Area */}
      <div className="pma-list-bg">
        {/* 게시글 렌더링 */}
        {activeTab === "posts" && displayPosts.map((post) => (
          <div key={post.id} className="pma-card" style={{ position: 'relative' }}>
            <div className="pma-card-icon">
              <svg width="29" height="29" viewBox="0 0 29 29" fill="none"><circle cx="14.5" cy="14.5" r="14" fill="#FFF9EA" stroke="#FFB200" /></svg>
            </div>
            <div className="pma-card-emoji">{post.icon}</div>
            <div className="pma-card-category">{post.category}</div>
            <div className="pma-card-author">{post.author}</div>
            <div className="pma-card-time">{post.time}</div>
            <div className="pma-card-title">{post.title}</div>
            <div className="pma-card-content">{post.content}</div>
            <div className="pma-card-stats">
              <div className="pma-stat-item like"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M12.0833 2.25C14.725 2.25 16.5 4.76438 16.5 7.11C16.5 11.8603 9.13333 15.75 9 15.75C8.86667 15.75 1.5 11.8603 1.5 7.11C1.5 4.76438 3.275 2.25 5.91667 2.25C7.43333 2.25 8.425 3.01781 9 3.69281C9.575 3.01781 10.5667 2.25 12.0833 2.25Z" stroke="#FF3737" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>{post.likeCount}</div>
              <div className="pma-stat-item comment"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15.75 9C15.75 12.7279 12.7279 15.75 9 15.75C8.10214 15.75 7.24523 15.5747 6.46162 15.2565C6.31164 15.1955 6.23666 15.1651 6.17604 15.1515C6.11675 15.1382 6.07286 15.1334 6.0121 15.1333C5.94998 15.1333 5.88231 15.1446 5.74699 15.1672L3.07857 15.6119C2.79914 15.6585 2.65942 15.6818 2.55839 15.6384C2.46996 15.6005 2.3995 15.53 2.36157 15.4416C2.31824 15.3406 2.34152 15.2009 2.3881 14.9214L2.83283 12.253C2.85539 12.1177 2.86666 12.05 2.86666 11.9879C2.86665 11.9271 2.86179 11.8833 2.8485 11.824C2.83491 11.7633 2.80446 11.6884 2.74355 11.5384C2.4253 10.7548 2.25 9.89786 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25C12.7279 2.25 15.75 5.27208 15.75 9Z" stroke="#2EC1C9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>{post.commentCount}</div>
              <div className="pma-stat-item view"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>{post.viewCount}</div>
            </div>
            <div className="pma-more-dots" onClick={() => setActiveEditMenu(activeEditMenu === `p-${post.id}` ? null : `p-${post.id}`)} style={{ cursor: 'pointer' }}>
              <svg width="3" height="14" viewBox="0 0 3 14" fill="none"><path d="M0.75 6.75C0.75 7.16421 1.08579 7.5 1.5 7.5C1.91421 7.5 2.25 7.16421 2.25 6.75C2.25 6.33579 1.91421 6 1.5 6C1.08579 6 0.75 6.33579 0.75 6.75Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M0.75 12C0.75 12.4142 1.08579 12.75 1.5 12.75C1.91421 12.75 2.25 12.4142 2.25 12C2.25 11.5858 1.91421 11.25 1.5 11.25C1.08579 11.25 0.75 11.5858 0.75 12Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M0.75 1.5C0.75 1.91421 1.08579 2.25 1.5 2.25C1.91421 2.25 2.25 1.91421 2.25 1.5C2.25 1.08579 1.91421 0.75 1.5 0.75C1.08579 0.75 0.75 1.08579 0.75 1.5Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            {activeEditMenu === `p-${post.id}` && (
              <div className="pma-edit-popup" style={{ position: 'absolute', top: '40px', right: '10px', background: '#fff', border: '1px solid #ddd', borderRadius: '4px', zIndex: 11, padding: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <div style={{ padding: '8px 15px', cursor: 'pointer', borderBottom: '1px solid #eee' }} onClick={() => alert('수정')}>수정</div>
                <div style={{ padding: '8px 15px', cursor: 'pointer', color: 'red' }} onClick={() => alert('삭제')}>삭제</div>
              </div>
            )}
          </div>
        ))}

        {/* 댓글 렌더링 */}
        {activeTab === "comments" && displayComments.map((comment) => (
          <div key={comment.id} className="pma-comment-card" style={{ position: 'relative', background: '#fff', padding: '15px', marginBottom: '10px', borderRadius: '8px' }}>
            <div className="pma-comment-profile-bg">
              <svg width="27" height="27" viewBox="0 0 27 27" fill="none"><circle cx="13.5" cy="13.5" r="13" fill="#FFF9EA" stroke="#FD9800" /></svg>
            </div>
            <div className="pma-comment-emoji" style={{ position: 'absolute', top: '20px', left: '20px' }}>{comment.icon}</div>
            <div className="pma-comment-author" style={{ marginLeft: '40px', fontWeight: 'bold' }}>{comment.author}</div>
            <div className="pma-comment-content" style={{ marginTop: '10px' }}>{comment.content}</div>
            <div className="pma-comment-date" style={{ marginTop: '10px', fontSize: '12px', color: '#999' }}>{comment.date}</div>
            
            <div className="pma-comment-menu" onClick={() => setActiveEditMenu(activeEditMenu === `c-${comment.id}` ? null : `c-${comment.id}`)} style={{ position: 'absolute', top: '15px', right: '15px', cursor: 'pointer' }}>
              <svg width="3" height="14" viewBox="0 0 3 14" fill="none"><path d="M1.5 7.5C1.91421 7.5 2.25 7.16421 2.25 6.75Z" stroke="black" strokeWidth="1.5"/><path d="M1.5 12.75C1.91421 12.75 2.25 12.4142 2.25 12Z" stroke="black" strokeWidth="1.5"/><path d="M1.5 2.25C1.91421 2.25 2.25 1.91421 2.25 1.5C2.25 1.08579 1.91421 0.75 1.5 0.75" stroke="black" strokeWidth="1.5"/></svg>
            </div>

            {activeEditMenu === `c-${comment.id}` && (
              <div className="pma-edit-popup" style={{ position: 'absolute', top: '40px', right: '10px', background: '#fff', border: '1px solid #ddd', borderRadius: '4px', zIndex: 11, padding: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <div style={{ padding: '8px 15px', cursor: 'pointer', borderBottom: '1px solid #eee' }} onClick={() => alert('수정')}>수정</div>
                <div style={{ padding: '8px 15px', cursor: 'pointer', color: 'red' }} onClick={() => alert('삭제')}>삭제</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}