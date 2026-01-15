import React, { useState } from "react";
import "../styles/home/notification.css";

export function Notification({ onBack }) {
  const [activeTab, setActiveTab] = useState("all");

  const allNotifications = [
    {
      id: 1,
      type: "board",
      title: "댓글 알림",
      content: "작성하신 글에 새로운 댓글이 달렸습니다.",
      time: "방금 전",
    },
    {
      id: 2,
      type: "chat",
      title: "새로운 메시지",
      content: "김철수님이 메시지를 보냈습니다.",
      time: "10분 전",
    },
    {
      id: 3,
      type: "system",
      title: "업데이트 안내",
      content: "서비스 점검이 예정되어 있습니다.",
      time: "1시간 전",
    },
    {
      id: 4,
      type: "board",
      title: "인기글 달성",
      content: "작성하신 글이 인기글로 선정되었습니다!",
      time: "2시간 전",
    },
    {
      id: 5,
      type: "chat",
      title: "새로운 메시지",
      content: "이영희님이 메시지를 보냈습니다.",
      time: "3시간 전",
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "board":
        return "🗣️";
      case "chat":
        return "💬";
      case "system":
        return "🍦";
      default:
        return "🔔";
    }
  };

  const filteredList =
    activeTab === "all"
      ? allNotifications
      : allNotifications.filter((n) => n.type === activeTab);

  return (
    <div className="notification-container">
      {/* Header */}
      <div className="notification-header">
        <div className="back-arrow" onClick={onBack}>
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
        <div className="notification-title">알림</div>
      </div>

      {/* Tabs */}
      <div className="notification-tabs">
        <div
          className={`tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          전체
        </div>
        <div
          className={`tab ${activeTab === "board" ? "active" : ""}`}
          onClick={() => setActiveTab("board")}
        >
          🗣️ 게시판
        </div>
        <div
          className={`tab ${activeTab === "chat" ? "active" : ""}`}
          onClick={() => setActiveTab("chat")}
        >
          💬 채팅
        </div>
        <div
          className={`tab ${activeTab === "system" ? "active" : ""}`}
          onClick={() => setActiveTab("system")}
        >
          🍦 시스템
        </div>
      </div>

      <div className="divider"></div>

      {/* Mark all as read */}
      <div className="mark-all-read">모두 읽기</div>

      {/* Notification List */}
      <div className="notification-list">
        {filteredList.map((notif) => (
          <div key={notif.id} className="notification-item">
            <div className="notif-icon-wrapper">
              <svg
                width="41"
                height="41"
                viewBox="0 0 41 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="20.5"
                  cy="20.5"
                  r="20"
                  fill="#FFF9EA"
                  stroke="#CDCDCD"
                />
              </svg>
              <div className="notif-icon">{getIcon(notif.type)}</div>
            </div>
            <div className="notif-content">
              <div className="notif-header-row">
                <div className="notif-title">{notif.title}</div>
                <div className="notif-time">{notif.time}</div>
              </div>
              <div className="notif-text">{notif.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
