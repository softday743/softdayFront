import React, { useState, useEffect, useRef } from "react";
import "../styles/mypage/profile-saved.css";
// PostDetail 컴포넌트 임포트 (경로 확인 필요)
import { PostDetail } from "./PostDetail";

export function ProfileSaved({ onBack, userName }) {
  const [activeTab, setActiveTab] = useState("posts"); // 'posts' | 'contents'
  
  // 상세 페이지 전환을 위한 상태
  const [selectedPostId, setSelectedPostId] = useState(null);

  // 페이지네이션 상태 (10개씩 끊기)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 드롭다운 메뉴 상태 관리
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  
  // 선택된 값 관리
  const [currentSort, setCurrentSort] = useState("최신순");
  const [currentFilter, setCurrentFilter] = useState("전체");

  const sortRef = useRef(null);
  const filterRef = useRef(null);

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortMenuOpen(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 탭 변경 시 페이지 1페이지로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Dummy Data (페이지네이션 확인을 위해 데이터를 넉넉히 생성)
  const [savedPosts] = useState(
    Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      title: `저장된 게시글 제목 ${25 - i}`,
      content: `이것은 ${25 - i}번째 저장된 게시글의 내용입니다.`,
      category: ["직장생활", "인간관계", "취미/여가"][i % 3],
      author: "gcg",
      time: "2026. 1. 14.",
      likeCount: 12,
      commentCount: 5,
      viewCount: 120,
      icon: ["🖥️", "👥", "💭"][i % 3],
    }))
  );

  const [savedContents] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      id: 100 + i,
      content: `저장된 콘텐츠 내용 ${i + 1}`,
      type: ["텍스트", "음성", "영상"][i % 3],
    }))
  );

  // 필터 및 정렬 로직 (예시)
  const filteredPosts = savedPosts.sort((a, b) => 
    currentSort === "최신순" ? b.id - a.id : a.id - b.id
  );

  // 현재 탭에 따른 데이터 선택 및 페이지네이션 계산
  const currentData = activeTab === "posts" ? filteredPosts : savedContents;
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // 페이지 이동 시 상단으로 스크롤
    const scrollArea = document.querySelector(".ps-list-bg");
    if (scrollArea) scrollArea.scrollTop = 0;
  };

  // 상세 보기 클릭 핸들러
  const handleItemClick = (id) => {
    setSelectedPostId(id);
  };

  // 상세 보기 화면 조건부 렌더링
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
    <div className="ps-container">
      {/* Header */}
      <div className="ps-back-arrow" onClick={onBack}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="ps-header-title">저장</div>

      {/* Tabs */}
      <div className="ps-tabs-container">
        <div className={`ps-tab ${activeTab === "posts" ? "active" : "inactive"}`} onClick={() => setActiveTab("posts")}>게시글</div>
        <div className={`ps-tab ${activeTab === "contents" ? "active" : "inactive"}`} onClick={() => setActiveTab("contents")}>콘텐츠</div>
      </div>

      {/* Filters */}
      <div className="ps-filter-bar">
        <div className="ps-dropdown-container" ref={filterRef} style={{ position: "relative" }}>
          <div className="ps-filter-btn" onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)} style={{ cursor: "pointer" }}>
            {activeTab === "contents" ? currentFilter : "전체"}
          </div>
          {activeTab === "contents" && isFilterMenuOpen && (
            <div className="ps-dropdown-menu" style={{ position: "absolute", top: "35px", left: 0, background: "white", border: "1px solid #eee", borderRadius: "4px", zIndex: 10, width: "80px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
              <div onClick={() => { setCurrentFilter("전체"); setIsFilterMenuOpen(false); }} style={{ padding: "8px", fontSize: "13px", borderBottom: "1px solid #f9f9f9" }}>전체</div>
              <div onClick={() => { setCurrentFilter("영상"); setIsFilterMenuOpen(false); }} style={{ padding: "8px", fontSize: "13px", borderBottom: "1px solid #f9f9f9" }}>🎬 영상</div>
              <div onClick={() => { setCurrentFilter("텍스트"); setIsFilterMenuOpen(false); }} style={{ padding: "8px", fontSize: "13px", borderBottom: "1px solid #f9f9f9" }}>📄 텍스트</div>
              <div onClick={() => { setCurrentFilter("음성"); setIsFilterMenuOpen(false); }} style={{ padding: "8px", fontSize: "13px" }}>🎧 음성</div>
            </div>
          )}
        </div>

        <div className="ps-search-bar">
          <div className="ps-search-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.75 15.75L11.2501 11.25M12.75 7.5C12.75 10.3995 10.3995 12.75 7.5 12.75C4.6005 12.75 2.25 10.3995 2.25 7.5C2.25 4.6005 4.6005 2.25 7.5 2.25C10.3995 2.25 12.75 4.6005 12.75 7.5Z" stroke="#656565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {activeTab === "posts" && (
          <div className="ps-dropdown-container" ref={sortRef} style={{ position: "relative" }}>
            <div className="ps-sort-btn" onClick={() => setIsSortMenuOpen(!isSortMenuOpen)} style={{ cursor: "pointer" }}>{currentSort}</div>
            {isSortMenuOpen && (
              <div className="ps-dropdown-menu" style={{ position: "absolute", top: "35px", right: 0, background: "white", border: "1px solid #eee", borderRadius: "4px", zIndex: 10, width: "90px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
                <div onClick={() => { setCurrentSort("최신순"); setIsSortMenuOpen(false); }} style={{ padding: "8px", fontSize: "13px", borderBottom: "1px solid #f9f9f9" }}>최신순</div>
                <div onClick={() => { setCurrentSort("오래된 순"); setIsSortMenuOpen(false); }} style={{ padding: "8px", fontSize: "13px" }}>오래된 순</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* List Area */}
      <div className="ps-list-bg">
        <div style={{ paddingBottom: "100px" }}> {/* 스크롤 여백 확보 */}
          {activeTab === "posts" ? (
            currentItems.map((post) => (
              <div key={post.id} className="ps-card" onClick={() => handleItemClick(post.id)} style={{ cursor: "pointer" }}>
                <div className="ps-card-icon">
                  <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="14.5" cy="14.5" r="14" fill="#FFF9EA" stroke="#FFB200" />
                  </svg>
                </div>
                <div className="ps-card-emoji">{post.icon}</div>
                <div className="ps-card-category">{post.category}</div>
                <div className="ps-card-author">{post.author}</div>
                <div className="ps-card-time">{post.time}</div>
                <div className="ps-card-title">{post.title}</div>
                <div className="ps-card-content">{post.content}</div>
                <div className="ps-card-stats">
                  <div className="ps-stat-item">❤️ {post.likeCount}</div>
                  <div className="ps-stat-item">💬 {post.commentCount}</div>
                  <div className="ps-stat-item">👁️ {post.viewCount}</div>
                  <div style={{ marginLeft: "auto", marginRight: "50px", fontSize: "12px", fontWeight: "600", color: "#facc15" }}>저장</div>
                </div>
                <div className="ps-bookmark-icon">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3736 14.1369L8.44656 10.7704L3.51953 14.1369V3.36417C3.51953 3.00703 3.66784 2.66452 3.93184 2.41199C4.19584 2.15945 4.5539 2.01758 4.92725 2.01758H11.9659C12.3392 2.01758 12.6973 2.15945 12.9613 2.41199C13.2253 2.66452 13.3736 3.00703 13.3736 3.36417V14.1369Z" fill="#FED417" stroke="#FED417" strokeWidth="1.5" />
                  </svg>
                </div>
                <div className="ps-more-dots" onClick={(e) => e.stopPropagation()}>⋮</div>
              </div>
            ))
          ) : (
            currentItems.map((item) => (
              <div key={item.id} className="ps-content-card" onClick={() => handleItemClick(item.id)} style={{ cursor: "pointer" }}>
                <div className="ps-content-tag">{item.type}</div>
                <div className="ps-content-text">{item.content}</div>
                <div className="ps-content-bookmark">
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.25 18.75L15.125 14.375L9 18.75V4.75C9 4.28587 9.18437 3.84075 9.51256 3.51256C9.84075 3.18437 10.2859 3 10.75 3H19.5C19.9641 3 20.4092 3.18437 20.7374 3.51256C21.0656 3.84075 21.25 4.28587 21.25 4.75V18.75Z" fill="#FECB17" stroke="#FECB17" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            ))
          )}

          {/* 페이지네이션 UI (버튼 디자인은 MyActivity 스타일을 참고하여 구현) */}
          {totalPages > 0 && (
            <div className="ps-pagination" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", marginTop: "30px", paddingBottom: "30px" }}>
              <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                style={{ background: "none", border: "none", cursor: currentPage === 1 ? "default" : "pointer", fontSize: "18px", color: currentPage === 1 ? "#d1d5db" : "#000" }}
              >
                &lt;
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: "15px", fontWeight: currentPage === i + 1 ? "800" : "400", color: currentPage === i + 1 ? "#000" : "#a3a3a3" }}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
                style={{ background: "none", border: "none", cursor: currentPage === totalPages ? "default" : "pointer", fontSize: "18px", color: currentPage === totalPages ? "#d1d5db" : "#000" }}
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