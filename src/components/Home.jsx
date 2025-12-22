import React, { useState, useEffect } from 'react';
import api from "../api/axiosConfig";
import './home.css';

export function Home({ onNavigate, userName = '사용자', hasCheckedIn = false }) {
    // [Logic] 알림 및 사용자 정보 상태 관리 (기존 HEAD 로직)
    const [hasUnread, setHasUnread] = useState(false);
    const [showNotiList, setShowNotiList] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [formData, setFormData] = useState({ name: "" });

    // [Logic] 1. 초기 데이터 로드 (알림 상태 & 프로필)
    useEffect(() => {
        checkUnread();
        fetchProfile();
    }, []);

    const checkUnread = async () => {
        try {
            const res = await api.get("/notifications/unread");
            setHasUnread(!!res.data);
        } catch (e) {
            console.log("알림 확인 실패", e);
        }
    };

    const fetchProfile = async () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const response = await api.get("/user/me");
                const data = response.data;
                setFormData({ name: data.name });
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        }
    };

    // [Logic] 2. 알림 아이콘 클릭 핸들러
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

    // [Logic] 3. 알림 항목 클릭 핸들러
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
        if (noti.targetId) {
            onNavigate("postDetail", noti.targetId);
        }
    };

    return (
        <div className="home-container">
            <div className="home-scroll-area">
                {/* Header */}
                <div className="home-header">
                    <div className="home-greeting">
                        {/* 백엔드에서 가져온 이름 우선 사용, 없으면 props 사용 */}
                        {(formData.name || userName) ? `${formData.name || userName}님 안녕하세요 ☺️` : '로그인을 해주세요'}
                    </div>
                    
                    {/* Bell Icon Wrapper */}
                    <div style={{ position: 'relative' }}>
                        <div 
                            className="home-bell-icon" 
                            onClick={handleIconClick} 
                            style={{ cursor: 'pointer' }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.35395 21C10.0591 21.6224 10.9853 22 11.9998 22C13.0142 22 13.9405 21.6224 14.6456 21M17.9998 8C17.9998 6.4087 17.3676 4.88258 16.2424 3.75736C15.1172 2.63214 13.5911 2 11.9998 2C10.4085 2 8.88235 2.63214 7.75713 3.75736C6.63192 4.88258 5.99977 6.4087 5.99977 8C5.99977 11.0902 5.22024 13.206 4.34944 14.6054C3.6149 15.7859 3.24763 16.3761 3.2611 16.5408C3.27601 16.7231 3.31463 16.7926 3.46155 16.9016C3.59423 17 4.19237 17 5.38863 17H18.6109C19.8072 17 20.4053 17 20.538 16.9016C20.6849 16.7926 20.7235 16.7231 20.7384 16.5408C20.7519 16.3761 20.3846 15.7859 19.6501 14.6054C18.7793 13.206 17.9998 11.0902 17.9998 8Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {/* Red Dot (조건부 렌더링) */}
                            {hasUnread && <div className="bell-dot"></div>}
                        </div>

                        {/* 알림 목록 드롭다운 */}
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
                    </div>
                </div>

                <div className="home-subtitle">
                    {hasCheckedIn ? '✅ 오늘의 기분이 기록되었어요' : '✅ 오늘의 기분은 어떠신가요?'}
                </div>

                {/* Stress Check-in Card */}
                {!hasCheckedIn ? (
                    <div className="stress-checkin-card" onClick={() => onNavigate && onNavigate('stressCheckIn')}>
                        <div className="checkin-date">12월 9일(화)</div>
                        <div className="checkin-emoji">☺️</div>
                        <div className="checkin-link">오늘의 기분을 기록해 볼까요?</div>
                    </div>
                ) : (
                    <div className="stress-result-card">
                        <div className="result-date">12월 9일(화)</div>
                        <div className="result-emoji">😐</div>
                        <div className="result-info">
                            <div className="result-score">3점</div>
                            <div className="result-reasons">업무과다, 수면 부족</div>
                        </div>
                    </div>
                )}

                {/* Today's Message Section */}
                <div className="section-title">
                    <span className="emoji-icon">🍦</span> {formData.name || userName}님을 위한 오늘의 메시지
                </div>

                <div className="message-card">
                    <div className="message-text">" 메시지 문구"</div>
                </div>

                {/* Popular Posts Section */}
                <div className="section-title popular">
                    👀 많은 사람들이 공감하고 있는 글이에요
                </div>
                <div className="more-link">더보기</div>

                {/* Post Cards */}
                <div className="post-list-container">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div className="post-card" key={index}>
                            <div className="post-category">직장생활</div>
                            <div className="post-time">6시간</div>
                            <div className="post-title">제목</div>
                            <div className="post-content">내용</div>
                            <div className="post-stats">
                                <div className="stat-item">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.0833 2.25C14.725 2.25 16.5 4.76438 16.5 7.11C16.5 11.8603 9.13333 15.75 9 15.75C8.86667 15.75 1.5 11.8603 1.5 7.11C1.5 4.76438 3.275 2.25 5.91667 2.25C7.43333 2.25 8.425 3.01781 9 3.69281C9.575 3.01781 10.5667 2.25 12.0833 2.25Z" stroke="#FF3737" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span className="stat-number red">24</span>
                                </div>
                                <div className="stat-item">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.75 9C15.75 12.7279 12.7279 15.75 9 15.75C8.10214 15.75 7.24523 15.5747 6.46162 15.2565C6.31164 15.1955 6.23666 15.1651 6.17604 15.1515C6.11675 15.1382 6.07286 15.1334 6.0121 15.1333C5.94998 15.1333 5.88231 15.1446 5.74699 15.1672L3.07857 15.6119C2.79914 15.6585 2.65942 15.6818 2.55839 15.6384C2.46996 15.6005 2.3995 15.53 2.36157 15.4416C2.31824 15.3406 2.34152 15.2009 2.3881 14.9214L2.83283 12.253C2.85539 12.1177 2.86666 12.05 2.86666 11.9879C2.86665 11.9271 2.86179 11.8833 2.8485 11.824C2.83491 11.7633 2.80446 11.6884 2.74355 11.5384C2.4253 10.7548 2.25 9.89786 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25C12.7279 2.25 15.75 5.27208 15.75 9Z" stroke="#2EC1C9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span className="stat-number teal">24</span>
                                </div>
                                <div className="stat-item">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_18_1074)">
                                            <path d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_18_1074">
                                                <rect width="18" height="18" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span className="stat-number gray">374</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}