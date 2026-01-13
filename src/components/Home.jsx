import React, { useState, useEffect } from "react";
import "./home.css";
import { GuestLoginPopup } from "./GuestLoginPopup";

const MESSAGES = [
  "작은 성취가 모여 큰 성공을 만듭니다.",
  "오늘도 수고한 당신, 푹 쉬세요.",
  "긍정적인 마인드가 좋은 결과를 가져옵니다.",
  "힘든 순간도 결국 지나갑니다.",
  "당신은 충분히 잘하고 있어요.",
  "나 자신을 믿으세요. 당신은 할 수 있습니다.",
  "오늘 흘린 땀이 내일의 기쁨이 됩니다."
];

const getKSTDate = () => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const kstGap = 9 * 60 * 60 * 1000;
  const kstDate = new Date(utc + kstGap);
  return kstDate;
};

const getFormattedDate = () => {
  const date = getKSTDate();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = weekDays[date.getDay()];
  return `${month}월 ${day}일(${dayOfWeek})`;
};

const getDailyMessage = () => {
  const date = getKSTDate();
  const dayStr = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
  let hash = 0;
  for (let i = 0; i < dayStr.length; i++) {
    hash = ((hash << 5) - hash) + dayStr.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % MESSAGES.length;
  return MESSAGES[index];
};

const MOCK_POPULAR_POST = {
  id: 1,
  category: "직장생활",
  emoji: "🖥️",
  author: "김철수",
  time: "2시간 전",
  title: "오늘 점심 메뉴 추천받아요",
  content: "회사 근처에 맛집이 없어서 고민이네요. 다들 뭐 드시나요? 추천 부탁드립니다!",
  likes: 24,
  comments: 12,
};

export function Home({
  onNavigate,
  userName = "사용자",
  hasCheckedIn = false,
}) {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  
  // Placeholder for notification state
  const hasUnreadNotifications = false;

  const isGuest = !userName;

  const handleRestrictedClick = (action) => {
    if (isGuest) {
      setShowLoginPopup(true);
    } else {
      action();
    }
  };

  const todayDate = getFormattedDate();
  const dailyMessage = getDailyMessage();

  return (
    <div className="home-container">
      <div className="home-scroll-area">
        {/* Header */}
        <div className="home-header">
          <div className="home-greeting">
            {userName ? `${userName}님 안녕하세요 ☺️` : "로그인을 해주세요"}
          </div>
          {/* Bell Icon */}
          <div
            className="home-bell-icon"
            onClick={() => handleRestrictedClick(() => onNavigate && onNavigate("notification"))}
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
                d="M9.35395 21C10.0591 21.6224 10.9853 22 11.9998 22C13.0142 22 13.9405 21.6224 14.6456 21M17.9998 8C17.9998 6.4087 17.3676 4.88258 16.2424 3.75736C15.1172 2.63214 13.5911 2 11.9998 2C10.4085 2 8.88235 2.63214 7.75713 3.75736C6.63192 4.88258 5.99977 6.4087 5.99977 8C5.99977 11.0902 5.22024 13.206 4.34944 14.6054C3.6149 15.7859 3.24763 16.3761 3.2611 16.5408C3.27601 16.7231 3.31463 16.7926 3.46155 16.9016C3.59423 17 4.19237 17 5.38863 17H18.6109C19.8072 17 20.4053 17 20.538 16.9016C20.6849 16.7926 20.7235 16.7231 20.7384 16.5408C20.7519 16.3761 20.3846 15.7859 19.6501 14.6054C18.7793 13.206 17.9998 11.0902 17.9998 8Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {hasUnreadNotifications && <div className="bell-dot"></div>}
          </div>
        </div>

        <div className="home-subtitle">
          {hasCheckedIn
            ? "✅ 오늘의 기분이 기록되었어요"
            : "✅ 오늘의 기분은 어떠신가요?"}
        </div>

        {/* Stress Check-in Card */}
        {!hasCheckedIn ? (
          <div
            className="stress-checkin-card"
            onClick={() => handleRestrictedClick(() => onNavigate && onNavigate("stress-checkin"))}
          >
            <div className="checkin-date">{todayDate}</div>
            <div className="checkin-emoji">☺️</div>
            <div className="checkin-link">오늘의 기분을 기록해 볼까요?</div>
          </div>
        ) : (
          <div className="stress-result-card" 
               onClick={() => handleRestrictedClick(() => onNavigate && onNavigate("stress-checkin-stats"))}
               style={{cursor: 'pointer'}}>
            <div className="result-date">{todayDate}</div>
            <div className="result-emoji">😐</div>
            <div className="result-info">
              <div className="result-score">3점</div>
              <div className="result-reasons">업무과다, 수면 부족</div>
            </div>
          </div>
        )}

        {/* Today's Message Section */}
        <div className="section-title">
          <span className="emoji-icon">🍦</span> {userName || "사용자"}님을 위한 오늘의
          메시지
        </div>

        <div className="message-card">
          <div className="message-text">" {dailyMessage} "</div>
        </div>

        {/* Popular Posts Section */}
        <div className="section-title popular">
          👀 많은 사람들이 공감하고 있는 글이에요
        </div>
        <div 
          className="more-link" 
          onClick={() => onNavigate && onNavigate("community")}
          style={{ cursor: "pointer" }}
        >
          더보기
        </div>

        {/* Post Cards */}
        <div 
          className="post-card" 
          onClick={() => onNavigate && onNavigate(`community/post/${MOCK_POPULAR_POST.id}`)}
          style={{ cursor: "pointer" }}
        >
            <div className="post-header">
              <div className="post-avatar">
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
                <div className="post-emoji" style={{ fontSize: "14px" }}>
                  {MOCK_POPULAR_POST.emoji}
                </div>
              </div>
              <div className="post-category-badge">
                <div className="post-category-text">{MOCK_POPULAR_POST.category}</div>
              </div>
              <div className="post-author">{MOCK_POPULAR_POST.author}</div>
              <div className="post-time">{MOCK_POPULAR_POST.time}</div>
            </div>
          <div className="post-title">{MOCK_POPULAR_POST.title}</div>
          <div className="post-content">{MOCK_POPULAR_POST.content}</div>
          <div className="post-stats">
            <div className="stat-item">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0833 2.25C14.725 2.25 16.5 4.76438 16.5 7.11C16.5 11.8603 9.13333 15.75 9 15.75C8.86667 15.75 1.5 11.8603 1.5 7.11C1.5 4.76438 3.275 2.25 5.91667 2.25C7.43333 2.25 8.425 3.01781 9 3.69281C9.575 3.01781 10.5667 2.25 12.0833 2.25Z"
                  stroke="#FF3737"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="stat-number red">{MOCK_POPULAR_POST.likes}</span>
            </div>
            {/* Comment Icon (Using existing Teal one from previous code but might want specific icon if needed) */}
            <div className="stat-item">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.75 9C15.75 12.7279 12.7279 15.75 9 15.75C8.10214 15.75 7.24523 15.5747 6.46162 15.2565C6.31164 15.1955 6.23666 15.1651 6.17604 15.1515C6.11675 15.1382 6.07286 15.1334 6.0121 15.1333C5.94998 15.1333 5.88231 15.1446 5.74699 15.1672L3.07857 15.6119C2.79914 15.6585 2.65942 15.6818 2.55839 15.6384C2.46996 15.6005 2.3995 15.53 2.36157 15.4416C2.31824 15.3406 2.34152 15.2009 2.3881 14.9214L2.83283 12.253C2.85539 12.1177 2.86666 12.05 2.86666 11.9879C2.86665 11.9271 2.86179 11.8833 2.8485 11.824C2.83491 11.7633 2.80446 11.6884 2.74355 11.5384C2.4253 10.7548 2.25 9.89786 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25C12.7279 2.25 15.75 5.27208 15.75 9Z"
                  stroke="#2EC1C9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="stat-number teal">{MOCK_POPULAR_POST.comments}</span>
            </div>
            {/* View Icon - keeping it if it was there or maybe standardizing */}
            <div className="stat-item">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_18_1074)">
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
                  <clipPath id="clip0_18_1074">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="stat-number gray">374</span>
            </div>
          </div>
        </div>
      </div>

      {showLoginPopup && (
        <GuestLoginPopup
          onClose={() => setShowLoginPopup(false)}
          onLogin={() => {
            setShowLoginPopup(false);
            if (onNavigate) onNavigate("onboarding");
          }}
        />
      )}
    </div>
  );
}
