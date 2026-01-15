import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/mypage/profile-liked.css";
import { PostDetail } from "./PostDetail"; 

export function ProfileLiked({ onBack, onPostClick, userName }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts");

  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("전체");
  const [sortOrder, setSortOrder] = useState("최신순");
  const [activeReportMenu, setActiveReportMenu] = useState(null);

  // --- 상세 페이지 전환 및 페이지네이션 로직 추가 ---
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const categoryRef = useRef(null);
  const sortRef = useRef(null);

  // 테스트를 위해 데이터를 넉넉히 생성 (10개 초과 시 페이지네이션 작동 확인용)
  const [likedPosts] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      title: `좋아요한 게시글 제목 ${15 - i}`,
      content: `이것은 ${15 - i}번째 게시글의 내용입니다.`,
      category: ["직장생활", "인간관계", "취미/여가"][i % 3],
      author: "gcg",
      time: "2026. 1. 14.",
      likeCount: 8,
      commentCount: 8,
      viewCount: 29,
      icon: ["🖥️", "👥", "💭"][i % 3],
    }))
  );

  const [likedComments] = useState(
    Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      postId: (i % 5) + 1, // 댓글이 달린 원본 게시글 ID 시뮬레이션
      content: `테스트 댓글 내용 ${i + 1}`,
      author: "gcg",
      date: "2026. 1. 14.",
      icon: "🍦",
    }))
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) setShowCategoryMenu(false);
      if (sortRef.current && !sortRef.current.contains(event.target)) setShowSortMenu(false);
      if (!event.target.closest('.pl-more-dots') && !event.target.closest('.pl-comment-menu')) setActiveReportMenu(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 탭 변경 시 페이지 번호 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // 필터 및 정렬 로직
  const filteredPosts = likedPosts
    .filter(post => categoryFilter === "전체" || post.category === categoryFilter)
    .sort((a, b) => (sortOrder === "최신순" ? b.id - a.id : a.id - b.id));

  const currentData = activeTab === "posts" ? filteredPosts : likedComments;

  // --- 페이지네이션 계산 로직 ---
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    const scrollArea = document.querySelector(".pl-list-bg");
    if (scrollArea) scrollArea.scrollTop = 0;
  };

  // 게시글 클릭 시 상세 페이지 이동 함수
  const handleItemClick = (id) => {
    setSelectedPostId(id);
  };

  // 상세 페이지 전환 조건부 렌더링
  if (selectedPostId) {
    return (
      <PostDetail 
        postId={selectedPostId} 
        onBack={() => setSelectedPostId(null)} 
        userName={userName}
      />
    );
  }

  return (
    <div className="pl-container">
      <div className="pl-back-arrow" onClick={onBack}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <div className="pl-header-title">좋아요</div>

      <div className="pl-tabs-container">
        <div className={`pl-tab ${activeTab === "posts" ? "active" : "inactive"}`} onClick={() => setActiveTab("posts")}>게시글</div>
        <div className={`pl-tab ${activeTab === "comments" ? "active" : "inactive"}`} onClick={() => setActiveTab("comments")}>댓글</div>
      </div>

      <div className="pl-filter-bar">
        {activeTab === "posts" && (
          <div className="pl-dropdown-wrapper" ref={categoryRef} style={{ position: 'relative' }}>
            <div className="pl-filter-btn" onClick={() => setShowCategoryMenu(!showCategoryMenu)} style={{ cursor: 'pointer' }}>{categoryFilter}</div>
            {showCategoryMenu && (
              <div className="pl-dropdown-menu" style={{ position: 'absolute', top: '100%', left: 0, background: '#fff', border: '1px solid #ddd', borderRadius: '4px', zIndex: 10, width: '100px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                {["전체", "직장생활", "인간관계", "취미/여가"].map(cat => (
                  <div key={cat} onClick={() => { setCategoryFilter(cat); setShowCategoryMenu(false); }} style={{ padding: '8px', cursor: 'pointer', fontSize: '14px', borderBottom: '1px solid #f0f0f0' }}>{cat}</div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="pl-search-bar"><div className="pl-search-icon"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15.75 15.75L11.2501 11.25M12.75 7.5C12.75 10.3995 10.3995 12.75 7.5 12.75C4.6005 12.75 2.25 10.3995 2.25 7.5C2.25 4.6005 4.6005 2.25 7.5 2.25C10.3995 2.25 12.75 4.6005 12.75 7.5Z" stroke="#656565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div></div>
        <div className="pl-dropdown-wrapper" ref={sortRef} style={{ position: 'relative' }}>
          <div className="pl-sort-btn" onClick={() => setShowSortMenu(!showSortMenu)} style={{ cursor: 'pointer' }}>{sortOrder}</div>
          {showSortMenu && (
            <div className="pl-dropdown-menu" style={{ position: 'absolute', top: '100%', right: 0, background: '#fff', border: '1px solid #ddd', borderRadius: '4px', zIndex: 10, width: '80px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              {["최신순", "오래된 순"].map(sort => (
                <div key={sort} onClick={() => { setSortOrder(sort); setShowSortMenu(false); }} style={{ padding: '8px', cursor: 'pointer', fontSize: '14px', borderBottom: '1px solid #f0f0f0' }}>{sort}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pl-list-bg">
        <div className="pl-scroll-content">
          {activeTab === "posts" ? (
            currentItems.map((post) => (
              <div 
                key={post.id} 
                className="pl-card" 
                style={{ position: 'relative', cursor: 'pointer' }}
                onClick={() => handleItemClick(post.id)}
              >
                <div className="pl-card-icon"><svg width="29" height="29" viewBox="0 0 29 29" fill="none"><circle cx="14.5" cy="14.5" r="14" fill="#FFF9EA" stroke="#FFB200" /></svg></div>
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
                <div className="pl-more-dots" onClick={(e) => {
                  e.stopPropagation(); // 카드 클릭(상세이동) 방지
                  setActiveReportMenu(activeReportMenu === `p-${post.id}` ? null : `p-${post.id}`);
                }} style={{ cursor: 'pointer' }}><svg width="3" height="14" viewBox="0 0 3 14" fill="none"><circle cx="1.5" cy="1.5" r="1.5" fill="black" /><circle cx="1.5" cy="7" r="1.5" fill="black" /><circle cx="1.5" cy="12.5" r="1.5" fill="black" /></svg></div>
              </div>
            ))
          ) : (
            currentItems.map((comment) => (
              <div 
                key={comment.id} 
                className="pl-comment-card" 
                style={{ padding: '15px', background: '#fff', marginBottom: '10px', borderRadius: '8px', cursor: 'pointer' }}
                onClick={() => handleItemClick(comment.postId)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '30px', height: '30px', background: '#FFF9EA', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #FFB200' }}>{comment.icon}</div>
                  <div style={{ fontSize: '14px', fontWeight: '600' }}>{comment.author}</div>
                </div>
                <div style={{ marginTop: '10px', fontSize: '14px' }}>{comment.content}</div>
                <div style={{ marginTop: '10px', fontSize: '12px', color: '#999' }}>{comment.date}</div>
              </div>
            ))
          )}

          {/* --- 페이지네이션 UI (ProfileMyActivity와 동일한 방식) --- */}
          {totalPages > 0 && (
            <div className="pl-pagination" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginTop: '30px', paddingBottom: '30px' }}>
              <button
                className="pl-page-btn arrow"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ background: 'none', border: 'none', cursor: currentPage === 1 ? 'default' : 'pointer', fontSize: '18px', color: currentPage === 1 ? '#d1d5db' : '#000' }}
              >
                &lt;
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`pl-page-btn number ${currentPage === i + 1 ? "active" : ""}`}
                  onClick={() => handlePageChange(i + 1)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: currentPage === i + 1 ? '800' : '400', color: currentPage === i + 1 ? '#000' : '#a3a3a3' }}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="pl-page-btn arrow"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{ background: 'none', border: 'none', cursor: currentPage === totalPages ? 'default' : 'pointer', fontSize: '18px', color: currentPage === totalPages ? '#d1d5db' : '#000' }}
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}