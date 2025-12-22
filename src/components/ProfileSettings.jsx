import React, { useState } from "react";
import "./profile-settings.css";

export function ProfileSettings({ onBack }) {
  const [view, setView] = useState("main"); // 'main' | 'notification'

  // Notification Toggles - All enabled by default
  const [toggles, setToggles] = useState({
    board: true,
    stats: true,
    chatbot: true,
    marketing: true,
  });

  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // CSS-based Switch Component
  const Switch = ({ isOn, onClick }) => (
    <div className={`pst-switch ${isOn ? "on" : "off"}`} onClick={onClick}>
      <div className="pst-switch-handle" />
    </div>
  );

  if (view === "notification") {
    return (
      <div className="pst-container">
        {/* Header Container */}
        <div className="pst-header-wrapper">
          <div className="pst-back-arrow" onClick={() => setView("main")}>
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
          <div className="pst-header-title">알림</div>
        </div>

        {/* Content Container (Normal Flow) */}
        <div className="pst-noti-container">
          <div className="pst-section-title">서비스 알림</div>

          <div className="pst-noti-item">
            <div className="pst-noti-label">게시판 알림</div>
            <Switch
              isOn={toggles.board}
              onClick={() => handleToggle("board")}
            />
          </div>
          <div className="pst-noti-item">
            <div className="pst-noti-label">통계 알림</div>
            <Switch
              isOn={toggles.stats}
              onClick={() => handleToggle("stats")}
            />
          </div>
          <div className="pst-noti-item">
            <div className="pst-noti-label">챗봇 알림</div>
            <Switch
              isOn={toggles.chatbot}
              onClick={() => handleToggle("chatbot")}
            />
          </div>

          <div className="pst-section-title pst-section-marketing">
            마케팅 알림
          </div>

          <div className="pst-noti-item">
            <div className="pst-noti-label">이벤트/프로모션</div>
            <Switch
              isOn={toggles.marketing}
              onClick={() => handleToggle("marketing")}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pst-container">
      {/* Header Container */}
      <div className="pst-header-wrapper">
        <div className="pst-back-arrow" onClick={onBack}>
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
        <div className="pst-header-title">설정</div>
      </div>

      <div className="pst-menu-list">
        <div className="pst-menu-row" onClick={() => setView("notification")}>
          알림
        </div>
        <div className="pst-menu-row">계정 관리</div>
        <div className="pst-menu-row">개인정보 처리방침</div>
        <div className="pst-menu-row">서비스 이용약관</div>
        <div className="pst-menu-row">버전 정보</div>
      </div>

      <div className="pst-logout">로그아웃</div>
    </div>
  );
}
