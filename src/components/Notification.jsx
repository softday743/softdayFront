import React, { useState } from 'react';
import './notification.css';

export function Notification({ onBack }) {
    const [activeTab, setActiveTab] = useState('all');

    const notifications = [
        { id: 1, type: 'board', icon: '🗣️', title: '제목', content: '내용', time: '시간' },
        { id: 2, type: 'chat', icon: '💬', title: '제목', content: '내용', time: '시간' },
        { id: 3, type: 'system', icon: '🍦', title: '제목', content: '내용', time: '시간' },
    ];

    return (
        <div className="notification-container">
            {/* Header */}
            <div className="notification-header">
                <div className="back-arrow" onClick={onBack}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className="notification-title">알림</div>
            </div>

            {/* Tabs */}
            <div className="notification-tabs">
                <div 
                    className={`tab ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all')}
                >
                    전체
                </div>
                <div 
                    className={`tab ${activeTab === 'board' ? 'active' : ''}`}
                    onClick={() => setActiveTab('board')}
                >
                    🗣️ 게시판
                </div>
                <div 
                    className={`tab ${activeTab === 'chat' ? 'active' : ''}`}
                    onClick={() => setActiveTab('chat')}
                >
                    💬 채팅
                </div>
                <div 
                    className={`tab ${activeTab === 'system' ? 'active' : ''}`}
                    onClick={() => setActiveTab('system')}
                >
                    🍦 시스템
                </div>
            </div>

            <div className="divider"></div>

            {/* Mark all as read */}
            <div className="mark-all-read">모두 읽기</div>

            {/* Notification List */}
            <div className="notification-list">
                {notifications.map(notif => (
                    <div key={notif.id} className="notification-item">
                        <div className="notif-icon-wrapper">
                            <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20.5" cy="20.5" r="20" fill="#FFF9EA" stroke="#CDCDCD"/>
                            </svg>
                            <div className="notif-icon">{notif.icon}</div>
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
