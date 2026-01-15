import React, { useState, useEffect, useRef } from "react";
import "../styles/mypage/profile-my-activity.css";
import { boardApi, userApi } from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { PostDetail } from "./PostDetail"; 

export function ProfileMyActivity({ onBack, onNavigate, userName }) {
  const [activeTab, setActiveTab] = useState("posts");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("전체");
  const [sortOrder, setSortOrder] = useState("최신순");
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedPostId, setSelectedPostId] = useState(null);
  const [myPosts, setMyPosts] = useState([]); 
  const [myComments, setMyComments] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const categoryRef = useRef(null);
  const sortRef = useRef(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      if (activeTab === "posts") {
        const response = await userApi.getMyPosts(); 
        setMyPosts(response.data || []);
      } else {
        const response = await userApi.getMyComments(); 
        setMyComments(response.data || []);
      }
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData().finally(() => setLoading(false));
    setCurrentPage(1);
    setSearchTerm("");
    setOpenMenuId(null);
  }, [activeTab]);

  const handleBackFromDetail = () => {
    setSelectedPostId(null);
    setTimeout(() => {
      fetchData();
    }, 300);
  };

  const getFilteredData = () => {
    const search = searchTerm.toLowerCase();

    if (activeTab === "posts") {
      return myPosts
        .filter((post) => {
          const matchesCategory = categoryFilter === "전체" || post.category === categoryFilter;
          const matchesSearch = 
            (post.title?.toLowerCase().includes(search) || false) || 
            (post.content?.toLowerCase().includes(search) || false);
          return matchesCategory && matchesSearch;
        })
        .sort((a, b) => (sortOrder === "최신순" ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt)));
    } else {
      return myComments
        .filter((comment) => {
          const contentMatch = comment.content?.toLowerCase().includes(search) || false;
          const titleMatch = comment.postTitle?.toLowerCase().includes(search) || false;
          return contentMatch || titleMatch;
        })
        .sort((a, b) => (sortOrder === "최신순" ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt)));
    }
  };

  const currentFilteredData = getFilteredData();
  const totalPages = Math.ceil(currentFilteredData.length / itemsPerPage);
  const currentItems = currentFilteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    const scrollArea = document.querySelector(".pma-list-bg");
    if (scrollArea) scrollArea.scrollTop = 0;
  };

  const handleDeletePost = async (e, postId) => {
    e.stopPropagation();
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        await boardApi.deletePost(postId);
        fetchData();
      } catch (error) { alert("삭제 실패"); }
    }
  };

  const toggleMenu = (e, postId) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === postId ? null : postId);
  };

  if (selectedPostId) {
    return <PostDetail postId={selectedPostId} onBack={handleBackFromDetail} userName={userName} />;
  }

  return (
    <div className="pma-container">
      <div className="pma-back-arrow" onClick={onBack} style={{ cursor: "pointer" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <div className="pma-header-title">내가 쓴 활동</div>

      <div className="pma-tabs-container">
        <div className={`pma-tab ${activeTab === "posts" ? "active" : ""}`} onClick={() => setActiveTab("posts")} style={{ cursor: "pointer" }}>게시글</div>
        <div className={`pma-tab ${activeTab === "comments" ? "active" : ""}`} onClick={() => setActiveTab("comments")} style={{ cursor: "pointer" }}>댓글</div>
      </div>

      <div className="pma-filter-bar">
        {activeTab === "posts" && (
          <div className="pma-dropdown-wrapper" ref={categoryRef}>
            <div className="pma-filter-btn" onClick={() => setShowCategoryMenu(!showCategoryMenu)} style={{ cursor: "pointer" }}>{categoryFilter}</div>
            {showCategoryMenu && (
              <div className="pma-dropdown-menu">
                {["전체", "직장생활", "인간관계", "취미/여가"].map(cat => (
                  <div key={cat} onClick={() => { setCategoryFilter(cat); setShowCategoryMenu(false); }} style={{ cursor: "pointer" }}>{cat}</div>
                ))}
              </div>
            )}
          </div>
        )}
        
        <div className="pma-search-bar">
          <input 
            type="text" 
            placeholder={activeTab === "posts" ? "글 제목, 내용 검색" : "댓글 내용 검색"} 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            style={{ border: "none", outline: "none", background: "transparent", width: "100%", fontSize: "14px" }}
          />
          <div className="pma-search-icon">🔍</div>
        </div>

        <div className="pma-dropdown-wrapper" ref={sortRef}>
          <div className="pma-sort-btn" onClick={() => setShowSortMenu(!showSortMenu)} style={{ cursor: "pointer" }}>{sortOrder}</div>
          {showSortMenu && (
            <div className="pma-dropdown-menu sort">
              {["최신순", "오래된 순"].map(sort => (
                <div key={sort} onClick={() => { setSortOrder(sort); setShowSortMenu(false); }} style={{ cursor: "pointer" }}>{sort}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pma-list-bg">
        <div className="pma-scroll-content">
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>로딩 중...</div>
          ) : currentItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "20px", color: "#999" }}>내역이 없습니다.</div>
          ) : (
            <>
              {currentItems.map((item) => (
                /* 여기서 style={{ cursor: "pointer" }}를 추가했습니다 */
                <div key={item.id} className={activeTab === "posts" ? "pma-card" : "pma-comment-card"} onClick={() => setSelectedPostId(activeTab === "posts" ? item.id : item.postId)} style={{ cursor: "pointer" }}>
                  {activeTab === "posts" ? (
                    <>
                      <div className="pma-card-header">
                        <span className="pma-card-emoji-box">📝</span>
                        <span className="pma-card-category-tag">{item.category || "일반"}</span>
                        <span className="pma-card-author-name">{item.isAnonymous ? "익명" : (item.username ? item.username.split('@')[0] : "익명")}</span>
                        <span className="pma-card-date">{item.createdAt?.split('T')[0]}</span>
                        <div className="pma-card-menu-wrap" style={{ marginLeft: "auto", position: "relative" }}>
                          <div className="pma-more-btn" onClick={(e) => toggleMenu(e, item.id)} style={{ padding: "0 5px", fontSize: "18px", fontWeight: "bold", color: "#999", cursor: "pointer" }}>⋮</div>
                          {openMenuId === item.id && (
                            <div className="pma-dropdown-card" style={{ position: "absolute", right: 0, top: "25px", backgroundColor: "#fff", border: "1px solid #eee", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", zIndex: 100, minWidth: "80px" }}>
                              <div onClick={(e) => { e.stopPropagation(); navigate("/profile/edit-post", { state: { post: item } }); }} style={{ padding: "10px", fontSize: "13px", borderBottom: "1px solid #f5f5f5", textAlign: "center", cursor: "pointer" }}>수정</div>
                              <div onClick={(e) => handleDeletePost(e, item.id)} style={{ padding: "10px", fontSize: "13px", color: "#ff4d4f", textAlign: "center", cursor: "pointer" }}>삭제</div>
                            </div>
                          )}
                        </div>
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
                        <span className="pma-comment-name">{item.isAnonymous ? "익명" : (item.username || "익명")}</span>
                        <span className="pma-comment-post-title" style={{ fontSize: "11px", color: "#999", marginLeft: "8px" }}>원문: {item.postTitle}</span>
                      </div>
                      <div className="pma-comment-body">{item.content}</div>
                      <div className="pma-comment-footer">{item.createdAt?.split('T')[0]}</div>
                    </>
                  )}
                </div>
              ))}

              {totalPages > 0 && (
                <div className="pma-pagination">
                  <button
                    className="pma-page-btn arrow"
                    onClick={(e) => { e.stopPropagation(); handlePageChange(currentPage - 1); }}
                    disabled={currentPage === 1}
                    style={{ cursor: currentPage === 1 ? "default" : "pointer" }}
                  >
                    &lt;
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      className={`pma-page-btn number ${currentPage === i + 1 ? "active" : ""}`}
                      onClick={(e) => { e.stopPropagation(); handlePageChange(i + 1); }}
                      style={{ cursor: "pointer" }}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    className="pma-page-btn arrow"
                    onClick={(e) => { e.stopPropagation(); handlePageChange(currentPage + 1); }}
                    disabled={currentPage === totalPages}
                    style={{ cursor: currentPage === totalPages ? "default" : "pointer" }}
                  >
                    &gt;
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}