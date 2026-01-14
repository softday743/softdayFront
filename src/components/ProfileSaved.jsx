import React, { useState } from "react";
import "../styles/mypage/profile-saved.css";

export function ProfileSaved({ onBack }) {
  const [activeTab, setActiveTab] = useState("posts"); // 'posts' | 'contents'

  // Dummy Data
  const [savedPosts, setSavedPosts] = useState([
    {
      id: 1,
      title: "제목",
      content: "내용",
      category: "직장생활",
      author: "작성자 정보",
      time: "시간(ex, n분 전)",
      likeCount: "좋아요",
      commentCount: "댓글",
      viewCount: "조회수",
      icon: "🖥️",
    },
    {
      id: 2,
      title: "제목",
      content: "내용",
      category: "인간관계",
      author: "작성자 정보",
      time: "시간(ex, n분 전)",
      likeCount: "좋아요",
      commentCount: "댓글",
      viewCount: "조회수",
      icon: "👥",
    },
    {
      id: 3,
      title: "제목",
      content: "내용",
      category: "취미/여가",
      author: "작성자 정보",
      time: "시간(ex, n분 전)",
      likeCount: "좋아요",
      commentCount: "댓글",
      viewCount: "조회수",
      icon: "💭",
    },
  ]);

  const [savedContents, setSavedContents] = useState([
    { id: 1, content: "내용", type: "텍스트" },
    { id: 2, content: "내용", type: "음성" },
    { id: 3, content: "내용", type: "텍스트" },
  ]);

  return (
    <div className="ps-container">
      {/* Header */}
      <div className="ps-back-arrow" onClick={onBack}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="ps-header-title">저장</div>

      {/* Tabs */}
      <div className="ps-tabs-container">
        <div
          className={`ps-tab ${activeTab === "posts" ? "active" : "inactive"}`}
          onClick={() => setActiveTab("posts")}
        >
          게시글
        </div>
        <div
          className={`ps-tab ${
            activeTab === "contents" ? "active" : "inactive"
          }`}
          onClick={() => setActiveTab("contents")}
        >
          콘텐츠
        </div>
      </div>

      {/* Filters */}
      <div className="ps-filter-bar">
        <div className="ps-filter-btn">전체</div>
        <div className="ps-search-bar">
          <div className="ps-search-icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.75 15.75L11.2501 11.25M12.75 7.5C12.75 10.3995 10.3995 12.75 7.5 12.75C4.6005 12.75 2.25 10.3995 2.25 7.5C2.25 4.6005 4.6005 2.25 7.5 2.25C10.3995 2.25 12.75 4.6005 12.75 7.5Z"
                stroke="#656565"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {activeTab === "posts" && <div className="ps-sort-btn">최신순</div>}
      </div>

      {/* List Area */}
      <div className="ps-list-bg">
        {activeTab === "posts" &&
          savedPosts.map((post) => (
            <div key={post.id} className="ps-card">
              {/* Icon */}
              <div className="ps-card-icon">
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
              </div>
              <div className="ps-card-emoji">{post.icon}</div>

              {/* Category */}
              <div className="ps-card-category">{post.category}</div>

              {/* Author */}
              <div className="ps-card-author">{post.author}</div>

              {/* Time */}
              <div className="ps-card-time">{post.time}</div>

              {/* Title & Content */}
              <div className="ps-card-title">{post.title}</div>
              <div className="ps-card-content">{post.content}</div>

              {/* Stats */}
              <div className="ps-card-stats">
                <div className="ps-stat-item">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.0833 2.25C14.725 2.25 16.5 4.76438 16.5 7.11C16.5 11.8603 9.13333 15.75 9 15.75C8.86667 15.75 1.5 11.8603 1.5 7.11C1.5 4.76438 3.275 2.25 5.91667 2.25C7.43333 2.25 8.425 3.01781 9 3.69281C9.575 3.01781 10.5667 2.25 12.0833 2.25Z"
                      stroke="#959595"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {post.likeCount}
                </div>
                <div className="ps-stat-item">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.75 9C15.75 12.7279 12.7279 15.75 9 15.75C8.10214 15.75 7.24523 15.5747 6.46162 15.2565C6.31164 15.1955 6.23666 15.1651 6.17604 15.1515C6.11675 15.1382 6.07286 15.1334 6.0121 15.1333C5.94998 15.1333 5.88231 15.1446 5.74699 15.1672L3.07857 15.6119C2.79914 15.6585 2.65942 15.6818 2.55839 15.6384C2.46996 15.6005 2.3995 15.53 2.36157 15.4416C2.31824 15.3406 2.34152 15.2009 2.3881 14.9214L2.83283 12.253C2.85539 12.1177 2.86666 12.05 2.86666 11.9879C2.86665 11.9271 2.86179 11.8833 2.8485 11.824C2.83491 11.7633 2.80446 11.6884 2.74355 11.5384C2.4253 10.7548 2.25 9.89786 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25C12.7279 2.25 15.75 5.27208 15.75 9Z"
                      stroke="#959595"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {post.commentCount}
                </div>
                <div className="ps-stat-item">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
                  </svg>
                  {post.viewCount}
                </div>
                {/* Saved Text */}
                <div
                  style={{
                    marginLeft: "auto",
                    marginRight: "50px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#facc15",
                  }}
                >
                  저장
                </div>
              </div>

              {/* Bookmark Icon */}
              <div className="ps-bookmark-icon">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3736 14.1369L8.44656 10.7704L3.51953 14.1369V3.36417C3.51953 3.00703 3.66784 2.66452 3.93184 2.41199C4.19584 2.15945 4.5539 2.01758 4.92725 2.01758H11.9659C12.3392 2.01758 12.6973 2.15945 12.9613 2.41199C13.2253 2.66452 13.3736 3.00703 13.3736 3.36417V14.1369Z"
                    fill="#FED417"
                    stroke="#FED417"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* More Dots */}
              <div className="ps-more-dots">
                <svg
                  width="3"
                  height="14"
                  viewBox="0 0 3 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.75 6.75C0.75 7.16421 1.08579 7.5 1.5 7.5C1.91421 7.5 2.25 7.16421 2.25 6.75C2.25 6.33579 1.91421 6 1.5 6C1.08579 6 0.75 6.33579 0.75 6.75Z"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M0.75 12C0.75 12.4142 1.08579 12.75 1.5 12.75C1.91421 12.75 2.25 12.4142 2.25 12C2.25 11.5858 1.91421 11.25 1.5 11.25C1.08579 11.25 0.75 11.5858 0.75 12Z"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M0.75 1.5C0.75 1.91421 1.08579 2.25 1.5 2.25C1.91421 2.25 2.25 1.91421 2.25 1.5C2.25 1.08579 1.91421 0.75 1.5 0.75C1.08579 0.75 0.75 1.08579 0.75 1.5Z"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}

        {activeTab === "contents" &&
          savedContents.map((item) => (
            <div key={item.id} className="ps-content-card">
              {/* Tag */}
              <div className="ps-content-tag">{item.type}</div>

              {/* Content */}
              <div className="ps-content-text">{item.content}</div>

              {/* Bookmark Icon */}
              <div className="ps-content-bookmark">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.25 18.75L15.125 14.375L9 18.75V4.75C9 4.28587 9.18437 3.84075 9.51256 3.51256C9.84075 3.18437 10.2859 3 10.75 3H19.5C19.9641 3 20.4092 3.18437 20.7374 3.51256C21.0656 3.84075 21.25 4.28587 21.25 4.75V18.75Z"
                    fill="#FECB17"
                    stroke="#FECB17"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
