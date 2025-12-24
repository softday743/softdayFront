import React, { useState, useEffect } from "react";
import "./community.css";
import api from "../api/axiosConfig";

export function Community({ onNavigate, onPostClick }) {
  const [activeTab, setActiveTab] = useState("all");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortOrder, setSortOrder] = useState("latest");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Generate 50 dummy posts
  const allPosts = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    emoji: ["🖥️", "👥", "💭"][i % 3],
    category: ["직장생활", "인간관계", "취미/여가"][i % 3],
    title: `게시글 제목 ${i + 1}`,
    content: `게시글 내용 ${i + 1}입니다.`,
    author: "작성자 정보",
    time: "시간(ex, n분 전)",
    likes: i % 5,
    comments: i % 3,
    views: "조회수",
    hasLikes: i % 5 > 0,
  }));

  // Pagination Logic
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(allPosts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when page changes (optional)
    const scrollArea = document.querySelector(".community-scroll-area");
    if (scrollArea) scrollArea.scrollTop = 0;
  };

  // [API] 게시글 목록 조회
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/board"); // 백엔드 목록 조회 API
        setPosts(response.data.content || response.data); // Page 객체일 경우 content 사용
      } catch (error) {
        console.error("Failed to fetch posts", error);
        setPosts(allPosts); // Fallback to dummy data
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="community-container">
      {/* Header Tabs - Fixed at Top */}
      <div className="community-header">
        <div
          className={`tab-item ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          전체
        </div>
        <div
          className={`tab-item ${activeTab === "work" ? "active" : ""}`}
          onClick={() => setActiveTab("work")}
        >
          🖥️ 직장생활
        </div>
        <div
          className={`tab-item ${activeTab === "relationship" ? "active" : ""}`}
          onClick={() => setActiveTab("relationship")}
        >
          👥 인간관계
        </div>
        <div
          className={`tab-item ${activeTab === "hobby" ? "active" : ""}`}
          onClick={() => setActiveTab("hobby")}
        >
          💭 취미/여가
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="community-scroll-area">
        {/* Filter & Sort */}
        <div className="filter-section">
          <div
            className="filter-icon"
            onClick={() => onNavigate("search")}
            style={{ cursor: "pointer" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            className="sort-dropdown"
            onClick={() => setIsSortOpen(!isSortOpen)}
          >
            <div className="sort-text">
              {sortOrder === "latest" ? "최신순" : "인기순"}
            </div>
            {isSortOpen && (
              <div className="sort-menu">
                <div
                  className="sort-option"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSortOrder("latest");
                    setIsSortOpen(false);
                  }}
                >
                  최신순
                </div>
                <div
                  className="sort-option"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSortOrder("popular");
                    setIsSortOpen(false);
                  }}
                >
                  인기순
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Post List */}
        <div className="community-post-list">
          {loading ? (
            <div>Loading...</div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="community-post-card"
                onClick={() => onPostClick(post.id)} // [수정] 클릭 시 ID 전달
                style={{ cursor: "pointer" }}
              >
                <div className="cp-header">
                  <div className="cp-avatar">
                    <svg
                      width="29"
                      height="29"
                      viewBox="0 0 29 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="14.5"
                        cy="14.5"
                        r="14"
                        fill="#FFF9EA"
                        stroke="#FFB200"
                      />
                    </svg>
                    <div className="cp-emoji" style={{ fontSize: "14px" }}>
                      {(post.category &&
                        (post.category.includes("직장") ||
                          post.category === "WORK"))
                        ? "🖥️"
                        : (post.category &&
                            (post.category.includes("인간") ||
                              post.category === "RELATIONSHIP"))
                        ? "👥"
                        : (post.category &&
                            (post.category.includes("취미") ||
                              post.category.includes("여가") ||
                              post.category === "HOBBY"))
                        ? "💭"
                        : post.emoji}
                    </div>
                  </div>
                  <div className="cp-category-badge">
                    <div className="cp-category-text">{post.category}</div>
                  </div>
                  <div className="cp-author">{post.username}</div>
                  <div className="cp-time">{new Date(post.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="cp-title">{post.title}</div>
                <div className="cp-content">{post.content}</div>
                <div className="cp-footer">
                  {/* Like */}
                  <div className="cp-stat-item">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.0833 2.25C14.725 2.25 16.5 4.76438 16.5 7.11C16.5 11.8603 9.13333 15.75 9 15.75C8.86667 15.75 1.5 11.8603 1.5 7.11C1.5 4.76438 3.275 2.25 5.91667 2.25C7.43333 2.25 8.425 3.01781 9 3.69281C9.575 3.01781 10.5667 2.25 12.0833 2.25Z"
                        stroke={post.hasLikes ? "#FF3737" : "#959595"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className={post.hasLikes ? "has-count" : ""}>
                      {post.likes > 0 ? post.likes : "좋아요"}
                    </span>
                  </div>
                  {/* Comment */}
                  <div className="cp-stat-item">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.75 9C15.75 12.7279 12.7279 15.75 9 15.75C8.10214 15.75 7.24523 15.5747 6.46162 15.2565C6.31164 15.1955 6.23666 15.1651 6.17604 15.1515C6.11675 15.1382 6.07286 15.1334 6.0121 15.1333C5.94998 15.1333 5.88231 15.1446 5.74699 15.1672L3.07857 15.6119C2.79914 15.6585 2.65942 15.6818 2.55839 15.6384C2.46996 15.6005 2.3995 15.53 2.36157 15.4416C2.31824 15.3406 2.34152 15.2009 2.3881 14.9214L2.83283 12.253C2.85539 12.1177 2.86666 12.05 2.86666 11.9879C2.86665 11.9271 2.86179 11.8833 2.8485 11.824C2.83491 11.7633 2.80446 11.6884 2.74355 11.5384C2.4253 10.7548 2.25 9.89786 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25C12.7279 2.25 15.75 5.27208 15.75 9Z"
                        stroke={post.comments > 0 ? "#2EC1C9" : "#959595"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className={post.comments > 0 ? "has-comments" : ""}>
                      {post.comments > 0 ? post.comments : "댓글"}
                    </span>
                  </div>
                  {/* View */}
                  <div className="cp-stat-item">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_3_1064)">
                        <path
                          d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z"
                          stroke="#959595"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                          stroke="#959595"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3_1064">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span>{post.views}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button
            className="page-btn prev"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`page-btn number ${
                currentPage === i + 1 ? "active" : ""
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="page-btn next"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>

        {/* FAB */}
        <div className="fab-button" onClick={() => onNavigate("createPost")}>
          <svg
            width="55"
            height="55"
            viewBox="0 0 55 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="27.5" cy="27.5" r="27.5" fill="#FD9800" />
          </svg>
          <svg
            className="fab-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 10.0003L14 6.0003M2.5 21.5003L5.88437 21.1243C6.29786 21.0783 6.5046 21.0553 6.69785 20.9928C6.86929 20.9373 7.03245 20.8589 7.18289 20.7597C7.35245 20.6479 7.49955 20.5008 7.79373 20.2066L21 7.0003C22.1046 5.89573 22.1046 4.10487 21 3.0003C19.8955 1.89573 18.1046 1.89573 17 3.0003L3.79373 16.2066C3.49955 16.5008 3.35246 16.6478 3.24064 16.8174C3.14143 16.9679 3.06301 17.131 3.00751 17.3025C2.94496 17.4957 2.92198 17.7024 2.87604 18.1159L2.5 21.5003Z"
              stroke="#FFF9EA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
