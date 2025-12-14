import React from "react";
import { useEffect, useState } from "react";
import "./profile.css";

export function Profile({ onNavigate }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 토큰 확인
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="profile-container w-full h-full relative bg-white overflow-hidden">
      {/* Background Content (Recent Conversations - blurred) */}
      <div className="profile-content-blur">
        <div className="recent-chat-title">최근 대화 </div>

        {/* Chat Card 1 (Active/Expanded) */}
        <div className="chat-card-expanded">
          <div className="chat-date">12월 9일(화)</div>
          <div className="chat-status">업무과다, 수면 부족 상태</div>
          <div className="chat-score">3.5점</div>
          <div className="chat-icon-wrapper">
            <svg
              width="55"
              height="55"
              viewBox="0 0 55 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect width="55" height="55" fill="url(#pattern0_3_594)" />
              <defs>
                <pattern
                  id="pattern0_3_594"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use xlinkHref="#image0_3_594" transform="scale(0.0138889)" />
                </pattern>
                <image
                  id="image0_3_594"
                  width="72"
                  height="72"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
          </div>
        </div>

        <div className="section-title-today">오늘의 메시지</div>
        <div className="home-header">
          <div className="home-greeting">00님 안녕하세요</div>
          <div
            className="home-header-icon"
            style={{ left: "353px", top: "56px" }}
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
          </div>
          <div
            className="home-header-dot"
            style={{ left: "367px", top: "56px" }}
          >
            <svg
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="4.5" cy="4.5" r="4.5" fill="#FF0000" />
            </svg>
          </div>
        </div>

        <div className="chat-card-simple card-248">
          <div className="chat-msg">메시지 문구</div>
        </div>

        <div className="more-btn">더보기</div>

        {/* List items from snippet */}
        <div className="list-card top-426">
          <div className="list-title">제목</div>
          <div className="list-time">시간</div>
          <div className="list-author">작성자</div>
          <div className="list-stat like">24</div>
          <div className="list-stat comment">24</div>
        </div>
        <div className="list-card top-542">
          <div className="list-title">제목</div>
          <div className="list-time">시간</div>
          <div className="list-author">작성자</div>
          <div className="list-stat like">24</div>
          <div className="list-stat comment">24</div>
        </div>
        <div className="list-card top-658">
          <div className="list-title">제목</div>
          <div className="list-time">시간</div>
          <div className="list-author">작성자</div>
        </div>
      </div>

      {!isLoggedIn && (
        <>
          {/* Backdrop Blur Overlay */}
          <div className="profile-overlay" />

          {/* Login Inducement Banner */}
          <div className="login-banner z-20">
            <div className="banner-title">더 많은게 궁금하다면?👀</div>
            <div className="banner-desc">
              로그인으로 소프트데이의
              <br />
              모든 기능을 누려보세요!
            </div>
            <div className="login-btn" onClick={() => onNavigate("login")}>
              <div className="login-btn-text">로그인하러 가기</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
