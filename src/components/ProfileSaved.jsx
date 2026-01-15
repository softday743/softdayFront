import React, { useState, useEffect, useRef } from "react";
import "../styles/mypage/profile-saved.css";
import { boardApi, userApi } from "../api/axiosConfig";
import { PostDetail } from "./PostDetail";

export function ProfileSaved({ onBack, userName }) {
  const [activeTab, setActiveTab] = useState("posts"); 
  const [savedPosts, setSavedPosts] = useState([]); 
  const [savedContents, setSavedContents] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [loading, setLoading] = useState(false);

  const [selectedPostId, setSelectedPostId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState("최신순");
  const [currentFilter, setCurrentFilter] = useState("전체");

  const sortRef = useRef(null);
  const filterRef = useRef(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === "posts") {
        const response = await userApi.getSavedPosts();
        setSavedPosts(response.data || []);
      } else {
        const response = await userApi.getUserPreferences();
        const pref = response.data; 
        const mappedContents = [];
        if (pref.video) mappedContents.push({ id: 'v', type: "영상", content: "선호하는 영상 콘텐츠" });
        if (pref.text) mappedContents.push({ id: 't', type: "텍스트", content: "선호하는 텍스트 콘텐츠" });
        if (pref.audio) mappedContents.push({ id: 'a', type: "음성", content: "선호하는 음성 콘텐츠" });
        setSavedContents(mappedContents);
      }
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) setIsSortMenuOpen(false);
      if (filterRef.current && !filterRef.current.contains(event.target)) setIsFilterMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    setSearchTerm("");
  }, [activeTab]);

  const getFilteredData = () => {
    const search = searchTerm.toLowerCase();
    if (activeTab === "posts") {
      return savedPosts
        .filter((post) => {
          const matchesCategory = currentFilter === "전체" || post.category === currentFilter;
          const matchesSearch = (post.title?.toLowerCase().includes(search) || false) || (post.content?.toLowerCase().includes(search) || false);
          return matchesCategory && matchesSearch;
        })
        .sort((a, b) => (currentSort === "최신순" ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt)));
    } else {
      return savedContents.filter((item) => {
        const matchesType = currentFilter === "전체" || item.type === currentFilter;
        const matchesSearch = item.content?.toLowerCase().includes(search) || false;
        return matchesType && matchesSearch;
      });
    }
  };

  const currentFilteredData = getFilteredData();
  const totalPages = Math.ceil(currentFilteredData.length / itemsPerPage);
  const currentItems = currentFilteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    const scrollArea = document.querySelector(".ps-list-bg");
    if (scrollArea) scrollArea.scrollTop = 0;
  };

  if (selectedPostId) {
    return <PostDetail postId={selectedPostId} onBack={() => { setSelectedPostId(null); fetchData(); }} userName={userName} />;
  }

  return (
    <div className="ps-container">
      <div className="ps-back-arrow" onClick={onBack} style={{ cursor: "pointer" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <div className="ps-header-title">저장</div>

      <div className="ps-tabs-container">
        <div className={`ps-tab ${activeTab === "posts" ? "active" : "inactive"}`} onClick={() => setActiveTab("posts")} style={{ cursor: "pointer" }}>게시글</div>
        <div className={`ps-tab ${activeTab === "contents" ? "active" : "inactive"}`} onClick={() => setActiveTab("contents")} style={{ cursor: "pointer" }}>콘텐츠</div>
      </div>

      <div className="ps-filter-bar">
        <div className="ps-dropdown-container" ref={filterRef} style={{ position: "relative" }}>
          <div className="ps-filter-btn" onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)} style={{ cursor: "pointer" }}>{currentFilter}</div>
          {isFilterMenuOpen && (
            <div className="ps-dropdown-menu" style={{ position: "absolute", top: "35px", left: 0, background: "white", border: "1px solid #eee", borderRadius: "4px", zIndex: 10, width: "110px" }}>
              {(activeTab === "posts" ? ["전체", "직장생활", "인간관계", "취미/여가"] : ["전체", "영상", "텍스트", "음성"]).map(cat => (
                <div key={cat} onClick={() => { setCurrentFilter(cat); setIsFilterMenuOpen(false); }} style={{ padding: "8px", fontSize: "13px", cursor: "pointer" }}>{cat}</div>
              ))}
            </div>
          )}
        </div>

        <div className="ps-search-bar">
          <input 
            type="text" 
            placeholder={activeTab === "posts" ? "글 제목, 내용 검색" : "콘텐츠 내용 검색"} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: "none", outline: "none", background: "transparent", width: "100%", fontSize: "14px" }}
          />
          <div style={{ cursor: "pointer" }}>🔍</div>
        </div>

        {activeTab === "posts" && (
          <div className="ps-dropdown-container" ref={sortRef} style={{ position: "relative" }}>
            <div className="ps-sort-btn" onClick={() => setIsSortMenuOpen(!isSortMenuOpen)} style={{ cursor: "pointer" }}>{currentSort}</div>
            {isSortMenuOpen && (
              <div className="ps-dropdown-menu" style={{ position: "absolute", top: "35px", right: 0, background: "white", border: "1px solid #eee", borderRadius: "4px", zIndex: 10, width: "90px" }}>
                <div onClick={() => { setCurrentSort("최신순"); setIsSortMenuOpen(false); }} style={{ padding: "8px", fontSize: "13px", cursor: "pointer" }}>최신순</div>
                <div onClick={() => { setCurrentSort("오래된 순"); setIsSortMenuOpen(false); }} style={{ padding: "8px", fontSize: "13px", cursor: "pointer" }}>오래된 순</div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="ps-list-bg">
        <div style={{ paddingBottom: "100px" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>로딩 중...</div>
          ) : currentItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "50px", color: "#999" }}>저장된 항목이 없습니다.</div>
          ) : activeTab === "posts" ? (
            currentItems.map((post) => (
              /* 여기서 style={{ cursor: "pointer" }}를 추가했습니다 */
              <div key={post.id} className="ps-card" onClick={() => setSelectedPostId(post.id)} style={{ cursor: "pointer" }}>
                <div className="ps-card-header">
                  <div className="ps-card-emoji-box">📝</div>
                  <span className="ps-card-category-tag">{post.category || "일반"}</span>
                  <span className="ps-card-author-name">{post.username?.split('@')[0]}</span>
                  <span className="ps-card-date">{post.createdAt?.split('T')[0]}</span>
                </div>
                <div className="ps-card-body">
                  <div className="ps-card-title">{post.title}</div>
                  <div className="ps-card-text">{post.content}</div>
                </div>
                <div className="ps-card-footer">
                  <span>❤️ {post.likeCount}</span>
                  <span>💬 {post.commentCount}</span>
                  <span>👁️ {post.viewCount}</span>
                  <span className="ps-saved-label">저장됨</span>
                  <div className="ps-bookmark-icon">
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><path d="M13.3736 14.1369L8.44656 10.7704L3.51953 14.1369V3.36417C3.51953 3.00703 3.66784 2.66452 3.93184 2.41199C4.19584 2.15945 4.5539 2.01758 4.92725 2.01758H11.9659C12.3392 2.01758 12.6973 2.15945 12.9613 2.41199C13.2253 2.66452 13.3736 3.00703 13.3736 3.36417V14.1369Z" fill="#FED417" stroke="#FED417" strokeWidth="1.5" /></svg>
                  </div>
                </div>
              </div>
            ))
          ) : (
            currentItems.map((item) => (
              <div key={item.id} className="ps-content-card">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span className="ps-card-category-tag">{item.type}</span>
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none"><path d="M21.25 18.75L15.125 14.375L9 18.75V4.75C9 4.28587 9.18437 3.84075 9.51256 3.51256C9.84075 3.18437 10.2859 3 10.75 3H19.5C19.9641 3 20.4092 3.18437 20.7374 3.51256C21.0656 3.84075 21.25 4.28587 21.25 4.75V18.75Z" fill="#FECB17" stroke="#FECB17" strokeWidth="2" /></svg>
                </div>
                <div className="ps-card-text">{item.content}</div>
              </div>
            ))
          )}

          {totalPages > 0 && (
            <div className="ps-pagination">
              <button 
                className="ps-page-btn arrow" 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                style={{ cursor: currentPage === 1 ? "default" : "pointer" }}
              > &lt; </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button 
                  key={i + 1} 
                  className={`ps-page-btn number ${currentPage === i + 1 ? "active" : ""}`} 
                  onClick={() => handlePageChange(i + 1)}
                  style={{ cursor: "pointer" }}
                > {i + 1} </button>
              ))}

              <button 
                className="ps-page-btn arrow" 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
                style={{ cursor: currentPage === totalPages ? "default" : "pointer" }}
              > &gt; </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}