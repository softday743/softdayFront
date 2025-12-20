import React, { useState, useEffect } from "react"; // useState, useEffect 추가
import api from "../api/axiosConfig"; // api 추가
import "./home.css";
import axios from "axios";

export function Home({ onNavigate }) {
  // [추가] 알림 관련 상태 관리
  const [hasUnread, setHasUnread] = useState(false);
  const [showNotiList, setShowNotiList] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({ name: "" });

  // [추가] 1. 초기 알림 상태 확인 (빨간 원 표시용)
  useEffect(() => {
    checkUnread();
  }, []);

  const checkUnread = async () => {
    try {
      const res = await api.get("/notifications/unread");
      setHasUnread(!!res.data);
    } catch (e) {
      console.log("알림 확인 실패", e);
    }
  };

  // [추가] 2. 알림 아이콘 클릭 시 (목록 열기/닫기)
  const handleIconClick = async () => {
    const nextShowState = !showNotiList;
    setShowNotiList(nextShowState);

    if (nextShowState) {
      try {
        const res = await api.get("/notifications");
        setNotifications(res.data);
      } catch (e) {
        console.error("알림 목록 로드 실패", e);
      }
    }
  };

  // [수정] 3. 알림 항목 클릭 시
  const handleNotificationClick = async (noti) => {
    if (!noti.isRead) {
      try {
        await api.post(`/notifications/${noti.id}/read`);

        const updatedList = notifications.map((n) =>
          n.id === noti.id ? { ...n, isRead: true } : n
        );
        setNotifications(updatedList);

        const unreadCount = updatedList.filter((n) => !n.isRead).length;
        if (unreadCount === 0) setHasUnread(false);
      } catch (e) {
        console.error("읽음 처리 실패", e);
      }
    }

    setShowNotiList(false);

    // [핵심 수정] App.jsx가 (screen, id) 형태로 받으므로 인자 2개로 전달
    if (noti.targetId) {
      // onNavigate('postDetail', noti.targetId); // 기존 코드 (만약 App.jsx가 지원하면 OK지만...)

      // App.jsx 구조상 onNavigate가 setScreen 함수라면, ID를 따로 저장해야 함
      // 하지만 Home 컴포넌트는 onNavigate prop을 어떻게 받는지 확인 필요.
      // App.jsx를 보면 <Home onNavigate={setScreen} /> 로 되어 있어 인자를 하나만 받음 (screen 이름만).

      // 따라서 Home에서는 setScreen만 할 수 있고 ID를 못 넘기는 구조임.
      // 이를 해결하려면 App.jsx에서 Home에 내려주는 함수를 바꿔야 함.

      // 일단 여기서는 부모에게 (screen, id)를 다 넘긴다고 가정하고 호출
      onNavigate("postDetail", noti.targetId);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const response = await api.get("/user/me");
          const data = response.data;
          setFormData({ name: data.name || "사용자" });
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="home-container">
      <div className="home-scroll-area">
        {/* Header Area */}
        <div className="home-header">
          {/* [수정] Bell Icon: 클릭 이벤트 추가 및 커서 스타일 적용 */}
          <div
            className="home-header-icon"
            style={{
              left: "353px",
              top: "56px",
              cursor: "pointer",
              zIndex: 50,
            }}
            onClick={handleIconClick}
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

          {/* [수정] Red Dot: hasUnread 상태에 따라 조건부 렌더링 */}
          {hasUnread && (
            <div
              className="home-header-dot"
              style={{
                left: "367px",
                top: "56px",
                pointerEvents: "none",
                zIndex: 51,
              }}
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
          )}

          {/* [추가] 알림 목록 드롭다운 (showNotiList가 true일 때만 표시) */}
          {showNotiList && (
            <div className="home-noti-dropdown">
              {notifications.length === 0 ? (
                <div className="noti-empty">새로운 알림이 없습니다.</div>
              ) : (
                notifications.map((noti) => (
                  <div
                    key={noti.id}
                    className={`noti-item ${noti.isRead ? "read" : "unread"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNotificationClick(noti);
                    }}
                  >
                    <div className="noti-msg">{noti.message}</div>
                    <div className="noti-date">
                      {new Date(noti.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Greeting */}
          <div className="home-greeting">{formData.name}님 안녕하세요</div>
        </div>

        {/* (이하 기존 코드 동일: Stress Check In Card, Today's Message 등) */}
        <div className="home-card stress-check">
          <div className="stress-check-date">12월 9일(화)</div>
          <div className="stress-check-title">스트레스 체크인 하기</div>
          <div className="stress-check-icon">
            <svg
              width="59"
              height="59"
              viewBox="0 0 59 59"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="29.5" cy="29.5" r="29.5" fill="#D9D9D9" />
            </svg>
          </div>
          <div className="stress-check-question">?</div>
        </div>

        <div className="section-title" style={{ top: "213px" }}>
          오늘의 메시지
        </div>
        <div className="home-card message-card">
          <div className="message-content">메시지 문구</div>
        </div>

        <div className="more-link" style={{ top: "402px" }}>
          더보기
        </div>

        <div className="section-title" style={{ top: "391px" }}>
          인기글
        </div>

        <div className="post-list-container">
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="post-card" key={index}>
              <div className="post-title">제목</div>
              <div className="post-time">시간</div>
              <div className="post-author">작성자</div>
              <div className="post-stat like" style={{ left: "250px" }}>
                24
              </div>
              <div className="post-stat comment" style={{ left: "292px" }}>
                24
              </div>
              <div className="post-icon" style={{ left: "230px" }}>
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
              </div>
              <div className="post-icon" style={{ left: "272px" }}>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
