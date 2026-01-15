import React, { useState, useEffect, useRef } from "react";
import "../styles/mypage/profile-my-activity.css";
import { boardApi } from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
// PostDetail 컴포넌트 임포트 (경로에 맞게 확인하세요)
import { PostDetail } from "./PostDetail"; 

export function ProfileMyActivity({ onBack, onNavigate, userName }) {
  const [activeTab, setActiveTab] = useState("posts");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("전체");
  const [sortOrder, setSortOrder] = useState("최신순");
  
  // 상세 페이지 전환을 위한 상태
  const [selectedPostId, setSelectedPostId] = useState(null);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const categoryRef = useRef(null);
  const sortRef = useRef(null);
  const navigate = useNavigate();

  // 테스트 데이터
  const [myPosts, setMyPosts] = useState(
    Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      title: `테스트 게시글 제목 ${25 - i}`,
      content: `이것은 ${25 - i}번째 게시글의 내용입니다.`,
      category: ["직장생활", "인간관계", "취미/여가"][i % 3],
      author: "gcg",
      time: "2026. 1. 14.",
      likeCount: 8,
      commentCount: 8,
      viewCount: 29,
      icon: ["🖥️", "👥", "💭"][i % 3],
    }))
  );

  const [myComments, setMyComments] = useState(
    Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      postId: (i % 5) + 1, // 댓글이 속한 게시글 ID 시뮬레이션
      content: `테스트 댓글 내용 ${i + 1}`,
      author: "gcg",
      date: "2026. 1. 14.",
      icon: "🍦",
    }))
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const filteredPosts = myPosts
    .filter((post) => categoryFilter === "전체" || post.category === categoryFilter)
    .sort((a, b) => (sortOrder === "최신순" ? b.id - a.id : a.id - b.id));

  const currentData = activeTab === "posts" ? filteredPosts : myComments;
  
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const scrollArea = document.querySelector(".pma-list-bg");
    if (scrollArea) scrollArea.scrollTop = 0;
  };

  // 상세 페이지 이동 함수
  const handleItemClick = (id) => {
    setSelectedPostId(id);
  };

  // selectedPostId가 있으면 PostDetail 컴포넌트를 보여줌
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
    <div className="pma-container">
      <div className="pma-back-arrow" onClick={onBack}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="pma-header-title">내가 쓴 활동</div>

      <div className="pma-tabs-container">
        <div className={`pma-tab ${activeTab === "posts" ? "active" : ""}`} onClick={() => setActiveTab("posts")}>게시글</div>
        <div className={`pma-tab ${activeTab === "comments" ? "active" : ""}`} onClick={() => setActiveTab("comments")}>댓글</div>
      </div>

      <div className="pma-filter-bar">
        {activeTab === "posts" && (
          <div className="pma-dropdown-wrapper" ref={categoryRef}>
            <div className="pma-filter-btn" onClick={() => setShowCategoryMenu(!showCategoryMenu)}>{categoryFilter}</div>
            {showCategoryMenu && (
              <div className="pma-dropdown-menu">
                {["전체", "직장생활", "인간관계", "취미/여가"].map(cat => (
                  <div key={cat} onClick={() => { setCategoryFilter(cat); setShowCategoryMenu(false); }}>{cat}</div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="pma-search-bar">
           <div className="pma-search-icon">🔍</div>
        </div>
        <div className="pma-dropdown-wrapper" ref={sortRef}>
          <div className="pma-sort-btn" onClick={() => setShowSortMenu(!showSortMenu)}>{sortOrder}</div>
          {showSortMenu && (
            <div className="pma-dropdown-menu sort">
              {["최신순", "오래된 순"].map(sort => (
                <div key={sort} onClick={() => { setSortOrder(sort); setShowSortMenu(false); }}>{sort}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pma-list-bg">
        <div className="pma-scroll-content">
          {currentItems.map((item) => (
            <div 
              key={item.id} 
              className={activeTab === "posts" ? "pma-card" : "pma-comment-card"}
              onClick={() => handleItemClick(activeTab === "posts" ? item.id : item.postId)}
              style={{ cursor: "pointer" }}
            >
              {activeTab === "posts" ? (
                <>
                  <div className="pma-card-header">
                    <span className="pma-card-emoji-box">{item.icon}</span>
                    <span className="pma-card-category-tag">{item.category}</span>
                    <span className="pma-card-author-name">{item.author}</span>
                    <span className="pma-card-date">{item.time}</span>
                  </div>
                  <div className="pma-card-body">
                    <div className="pma-card-post-title">{item.title}</div>
                    <div className="pma-card-post-text">{item.content}</div>
                  </div>
                  <div className="pma-card-footer">
                    <span>❤️ 좋아요 {item.likeCount}</span>
                    <span>💬 댓글 {item.commentCount}</span>
                    <span>👁️ 조회 {item.viewCount}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="pma-comment-header">
                    <span className="pma-comment-icon">🍦</span>
                    <span className="pma-comment-name">{item.author}</span>
                  </div>
                  <div className="pma-comment-body">{item.content}</div>
                  <div className="pma-comment-footer">{item.date}</div>
                </>
              )}
            </div>
          ))}

          {totalPages > 0 && (
            <div className="pma-pagination">
              <button
                className="pma-page-btn arrow"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`pma-page-btn number ${currentPage === i + 1 ? "active" : ""}`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="pma-page-btn arrow"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
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