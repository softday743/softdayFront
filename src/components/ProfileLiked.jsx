import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/mypage/profile-liked.css";
import { boardApi, userApi } from "../api/axiosConfig"; 
import { PostDetail } from "./PostDetail"; 

export function ProfileLiked({ onBack, userName }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("전체");
  const [sortOrder, setSortOrder] = useState("최신순");
  const [openMenuId, setOpenMenuId] = useState(null); // 더보기 메뉴 상태

  const [likedPosts, setLikedPosts] = useState([]); 
  const [likedComments, setLikedComments] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [loading, setLoading] = useState(false);

  const [selectedPostId, setSelectedPostId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const categoryRef = useRef(null);
  const sortRef = useRef(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === "posts") {
        const response = await userApi.getLikedPosts();
        setLikedPosts(response.data || []);
      } else {
        const response = await userApi.getMyComments(); 
        setLikedComments(response.data || []);
      }
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setOpenMenuId(null);
  }, [activeTab]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm]);

  const getFilteredData = () => {
    const search = searchTerm.toLowerCase();
    if (activeTab === "posts") {
      return likedPosts
        .filter((post) => {
          const matchesCategory = categoryFilter === "전체" || post.category === categoryFilter;
          const matchesSearch = (post.title?.toLowerCase().includes(search) || false) || (post.content?.toLowerCase().includes(search) || false);
          return matchesCategory && matchesSearch;
        })
        .sort((a, b) => (sortOrder === "최신순" ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt)));
    } else {
      return likedComments
        .filter((comment) => (comment.content?.toLowerCase().includes(search) || false) || (comment.postTitle?.toLowerCase().includes(search) || false))
        .sort((a, b) => (sortOrder === "최신순" ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt)));
    }
  };

  const currentFilteredData = getFilteredData();
  const totalPages = Math.ceil(currentFilteredData.length / itemsPerPage);
  const currentItems = currentFilteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    const scrollArea = document.querySelector(".pl-list-bg");
    if (scrollArea) scrollArea.scrollTop = 0;
  };

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  if (selectedPostId) {
    return <PostDetail postId={selectedPostId} onBack={() => { setSelectedPostId(null); fetchData(); }} userName={userName} />;
  }

  return (
    <div className="pl-container">
      {/* 뒤로가기 화살표 */}
      <div className="pl-back-arrow" onClick={onBack} style={{ cursor: "pointer" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <div className="pl-header-title">좋아요</div>

      <div className="pl-tabs-container">
        {/* 게시글 탭 */}
        <div 
          className={`pl-tab ${activeTab === "posts" ? "active" : ""}`} 
          onClick={() => setActiveTab("posts")} 
          style={{ cursor: "pointer" }}
        >
          게시글
        </div>
        {/* 댓글 탭 */}
        <div 
          className={`pl-tab ${activeTab === "comments" ? "active" : ""}`} 
          onClick={() => setActiveTab("comments")} 
          style={{ cursor: "pointer" }}
        >
          댓글
        </div>
      </div>

      <div className="pl-filter-bar">
        {activeTab === "posts" && (
          <div className="pl-dropdown-wrapper" ref={categoryRef} style={{ position: 'relative' }}>
            <div className="pl-filter-btn" onClick={() => setShowCategoryMenu(!showCategoryMenu)} style={{ cursor: "pointer" }}>{categoryFilter}</div>
            {showCategoryMenu && (
              <div className="pl-dropdown-menu" style={{ position: 'absolute', top: '100%', left: 0, background: '#fff', border: '1px solid #ddd', borderRadius: '4px', zIndex: 10, width: '100px' }}>
                {["전체", "직장생활", "인간관계", "취미/여가"].map(cat => (
                  <div key={cat} onClick={() => { setCategoryFilter(cat); setShowCategoryMenu(false); }} style={{ padding: '8px', cursor: 'pointer', fontSize: '12px' }}>{cat}</div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="pl-search-bar">
          <input 
            type="text" 
            placeholder={activeTab === "posts" ? "글 제목, 내용 검색" : "댓글 내용 검색"} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: "none", outline: "none", background: "transparent", width: "100%", fontSize: "14px" }}
          />
          <div style={{ cursor: "pointer" }}>🔍</div>
        </div>

        <div className="pl-dropdown-wrapper" ref={sortRef} style={{ position: 'relative' }}>
          <div className="pl-sort-btn" onClick={() => setShowSortMenu(!showSortMenu)} style={{ cursor: "pointer" }}>{sortOrder}</div>
          {showSortMenu && (
            <div className="pl-dropdown-menu" style={{ position: 'absolute', top: '100%', right: 0, background: '#fff', border: '1px solid #ddd', borderRadius: '4px', zIndex: 10, width: '80px' }}>
              {["최신순", "오래된 순"].map(sort => (
                <div key={sort} onClick={() => { setSortOrder(sort); setShowSortMenu(false); }} style={{ padding: '8px', cursor: 'pointer', fontSize: '12px' }}>{sort}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pl-list-bg">
        <div className="pl-scroll-content">
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>로딩 중...</div>
          ) : currentItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "20px", color: "#999" }}>내역이 없습니다.</div>
          ) : (
            currentItems.map((item) => (
              /* 게시글 카드 클릭 영역 */
              <div 
                key={item.id} 
                className="pl-card" 
                onClick={() => setSelectedPostId(activeTab === "posts" ? item.id : item.postId)}
                style={{ cursor: "pointer" }}
              >
                <div className="pl-card-header">
                  <span className="pl-card-emoji-box">{activeTab === "posts" ? "📝" : "🍦"}</span>
                  {activeTab === "posts" && <span className="pl-card-category-tag">{item.category || "일반"}</span>}
                  <span className="pl-card-author-name">{item.username?.split('@')[0] || "익명"}</span>
                  <span className="pl-card-date">{item.createdAt?.split('T')[0]}</span>
                  
                  {/* 더보기 메뉴 아이콘 */}
                  <div style={{ marginLeft: "auto", position: "relative" }}>
                    <div onClick={(e) => toggleMenu(e, item.id)} style={{ padding: "0 5px", cursor: "pointer", fontWeight: "bold", color: "#999" }}>⋮</div>
                    {openMenuId === item.id && (
                      <div className="pl-dropdown-card">
                        <div style={{ padding: "10px", fontSize: "12px", textAlign: "center", color: "#ff4d4f", cursor: "pointer" }}>신고하기</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pl-card-body">
                  {activeTab === "posts" ? (
                    <>
                      <div className="pl-card-title">{item.title}</div>
                      <div className="pl-card-text">{item.content}</div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: "11px", color: "#999", marginBottom: "5px" }}>원문: {item.postTitle}</div>
                      <div className="pl-card-text">{item.content}</div>
                    </>
                  )}
                </div>

                {activeTab === "posts" && (
                  <div className="pl-card-footer">
                    <span>❤️ {item.likeCount}</span> <span>💬 {item.commentCount}</span> <span>👁️ {item.viewCount}</span>
                  </div>
                )}
              </div>
            ))
          )}

          {/* 페이지네이션 */}
          {totalPages > 0 && (
            <div className="pl-pagination">
              <button 
                className="pl-page-btn" 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                style={{ cursor: currentPage === 1 ? "default" : "pointer" }}
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button 
                  key={i + 1} 
                  className={`pl-page-btn ${currentPage === i + 1 ? "active" : ""}`} 
                  onClick={() => handlePageChange(i + 1)}
                  style={{ cursor: "pointer" }}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                className="pl-page-btn" 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
                style={{ cursor: currentPage === totalPages ? "default" : "pointer" }}
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