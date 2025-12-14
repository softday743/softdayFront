import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig"; // API 설정 파일
import "./community.css";

export function Community({ onNavigate }) {
  // 백엔드와 동일하게 String 값으로 관리
  const [activeTab, setActiveTab] = useState("전체");
  const [posts, setPosts] = useState([]);

  // 게시글 목록 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 페이지네이션 없이 전체 조회 예시 (실무에서는 page, size 파라미터 사용 권장)
        const response = await api.get("/board?size=100");
        setPosts(response.data.content);
      } catch (error) {
        console.error("게시글 로딩 실패", error);
      }
    };
    fetchPosts();
  }, []);

  // 탭(카테고리)에 따른 필터링 (프론트엔드에서 필터링)
  const filteredPosts =
    activeTab === "전체"
      ? posts
      : posts.filter((post) => post.category === activeTab);

  return (
    <div className="community-container">
      {/* 상단 탭: String 카테고리 값 */}
      <div className="community-header">
        {/* 백엔드에 저장되는 카테고리 String 값과 일치해야 함 */}
        {["전체", "직장 생활", "인간관계", "취미/여가"].map((tab) => (
          <div
            key={tab}
            className={`tab-item ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="community-scroll-area">
        {/* 필터 및 정렬 (UI 유지) */}
        <div className="filter-section">
          <div
            className="filter-icon"
            onClick={() => onNavigate("search")}
            style={{ cursor: "pointer" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="sort-dropdown">
            <div className="sort-text">최신순</div>
          </div>
        </div>

        {/* 글쓰기 버튼 */}
        <div
          className="start-new-card"
          onClick={() => onNavigate("createPost")}
        >
          <div className="start-new-text">새로 시작하기</div>
        </div>

        {/* 게시글 리스트 */}
        <div className="community-post-list">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="community-post-card"
              onClick={() => onNavigate("postDetail", post.id)} // ID 전달
              style={{ cursor: "pointer" }}
            >
              <div className="cp-header">
                <div className="cp-avatar">
                  <svg width="29" height="29" viewBox="0 0 29 29" fill="none">
                    <circle cx="14.5" cy="14.5" r="14.5" fill="#D9D9D9" />
                  </svg>
                </div>
                <div className="cp-category-badge">
                  {/* String 카테고리 표시 */}
                  <div className="cp-category-text">{post.category}</div>
                </div>
                <div className="cp-author">{post.username}</div>
                <div className="cp-time">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="cp-title">{post.title}</div>
              {/* 내용 미리보기 (CSS로 말줄임 처리됨) */}
              <div className="cp-content">{post.content}</div>
              <div className="cp-footer">
                {/* 좋아요 */}
                <div className="cp-stat-item">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M12.0833 2.25C14.725 2.25 16.5 4.76438 16.5 7.11C16.5 11.8603 9.13333 15.75 9 15.75C8.86667 15.75 1.5 11.8603 1.5 7.11C1.5 4.76438 3.275 2.25 5.91667 2.25C7.43333 2.25 8.425 3.01781 9 3.69281C9.575 3.01781 10.5667 2.25 12.0833 2.25Z"
                      stroke="#959595"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{post.likeCount}</span>
                </div>
                {/* 댓글 */}
                <div className="cp-stat-item">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M15.75 9C15.75 12.7279 12.7279 15.75 9 15.75C8.10214 15.75 7.24523 15.5747 6.46162 15.2565C6.31164 15.1955 6.23666 15.1651 6.17604 15.1515C6.11675 15.1382 6.07286 15.1334 6.0121 15.1333C5.94998 15.1333 5.88231 15.1446 5.74699 15.1672L3.07857 15.6119C2.79914 15.6585 2.65942 15.6818 2.55839 15.6384C2.46996 15.6005 2.3995 15.53 2.36157 15.4416C2.31824 15.3406 2.34152 15.2009 2.3881 14.9214L2.83283 12.253C2.85539 12.1177 2.86666 12.05 2.86666 11.9879C2.86665 11.9271 2.86179 11.8833 2.8485 11.824C2.83491 11.7633 2.80446 11.6884 2.74355 11.5384C2.4253 10.7548 2.25 9.89786 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25C12.7279 2.25 15.75 5.27208 15.75 9Z"
                      stroke="#959595"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{post.commentCount}</span>
                </div>
                {/* 조회수 */}
                <div className="cp-stat-item">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
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
                  <span>{post.viewCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
