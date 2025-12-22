import React, { useState } from 'react';
import './profile-liked.css';

export function ProfileLiked({ onBack }) {
    const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'comments'
    
    // Dummy Data
    const [likedPosts, setLikedPosts] = useState([
        { id: 1, title: '제목', content: '내용', category: '직장생활', author: '작성자 정보', time: '시간(ex, n분 전)', likeCount: 1, commentCount: '댓글', viewCount: '조회수', icon: '🖥️' },
        { id: 2, title: '제목', content: '내용', category: '인간관계', author: '작성자 정보', time: '시간(ex, n분 전)', likeCount: 1, commentCount: '댓글', viewCount: '조회수', icon: '👥' },
        { id: 3, title: '제목', content: '내용', category: '취미/여가', author: '작성자 정보', time: '시간(ex, n분 전)', likeCount: 1, commentCount: '댓글', viewCount: '조회수', icon: '💭' }
    ]);

    const [likedComments, setLikedComments] = useState([
        { id: 1, content: '내용', author: '작성자 정보', date: '2025. 12. 20. 19:02', icon: '🍦' },
        { id: 2, content: '내용', author: '작성자 정보', date: '2025. 12. 20. 19:02', icon: '🍦' },
        { id: 3, content: '내용', author: '작성자 정보', date: '2025. 12. 20. 19:02', icon: '🍦' }
    ]);

    return (
        <div className="pl-container">
            {/* Header */}
            <div className="pl-back-arrow" onClick={onBack}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <div className="pl-header-title">좋아요</div>

            {/* Tabs */}
            <div className="pl-tabs-container">
                <div 
                    className={`pl-tab ${activeTab === 'posts' ? 'active' : 'inactive'}`}
                    onClick={() => setActiveTab('posts')}
                >
                    게시글
                </div>
                <div 
                    className={`pl-tab ${activeTab === 'comments' ? 'active' : 'inactive'}`}
                    onClick={() => setActiveTab('comments')}
                >
                    댓글
                </div>
            </div>

            {/* Filters */}
            <div className="pl-filter-bar">
                <div className="pl-filter-btn">전체</div>
                <div className="pl-search-bar">
                    <div className="pl-search-icon">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.75 15.75L11.2501 11.25M12.75 7.5C12.75 10.3995 10.3995 12.75 7.5 12.75C4.6005 12.75 2.25 10.3995 2.25 7.5C2.25 4.6005 4.6005 2.25 7.5 2.25C10.3995 2.25 12.75 4.6005 12.75 7.5Z" stroke="#656565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div className="pl-sort-btn">최신순</div>
            </div>

            {/* List Area */}
            <div className="pl-list-bg">
                {activeTab === 'posts' && likedPosts.map(post => (
                    <div key={post.id} className="pl-card">
                        {/* Icon */}
                        <div className="pl-card-icon">
                            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="14.5" cy="14.5" r="14" fill="#FFF9EA" stroke="#FFB200"/>
                            </svg>
                        </div>
                        <div className="pl-card-emoji">{post.icon}</div>

                        {/* Category */}
                        <div className="pl-card-category">{post.category}</div>

                        {/* Author */}
                        <div className="pl-card-author">{post.author}</div>

                        {/* Time */}
                        <div className="pl-card-time">{post.time}</div>

                        {/* Title & Content */}
                        <div className="pl-card-title">{post.title}</div>
                        <div className="pl-card-content">{post.content}</div>

                        {/* Stats */}
                        <div className="pl-card-stats">
                            <div className="pl-stat-item liked">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.0833 2.25C14.725 2.25 16.5 4.76438 16.5 7.11C16.5 11.8603 9.13333 15.75 9 15.75C8.86667 15.75 1.5 11.8603 1.5 7.11C1.5 4.76438 3.275 2.25 5.91667 2.25C7.43333 2.25 8.425 3.01781 9 3.69281C9.575 3.01781 10.5667 2.25 12.0833 2.25Z" fill="#FF3737" stroke="#FF3737" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                {post.likeCount}
                            </div>
                            <div className="pl-stat-item comment">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.75 9C15.75 12.7279 12.7279 15.75 9 15.75C8.10214 15.75 7.24523 15.5747 6.46162 15.2565C6.31164 15.1955 6.23666 15.1651 6.17604 15.1515C6.11675 15.1382 6.07286 15.1334 6.0121 15.1333C5.94998 15.1333 5.88231 15.1446 5.74699 15.1672L3.07857 15.6119C2.79914 15.6585 2.65942 15.6818 2.55839 15.6384C2.46996 15.6005 2.3995 15.53 2.36157 15.4416C2.31824 15.3406 2.34152 15.2009 2.3881 14.9214L2.83283 12.253C2.85539 12.1177 2.86666 12.05 2.86666 11.9879C2.86665 11.9271 2.86179 11.8833 2.8485 11.824C2.83491 11.7633 2.80446 11.6884 2.74355 11.5384C2.4253 10.7548 2.25 9.89786 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25C12.7279 2.25 15.75 5.27208 15.75 9Z" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                {post.commentCount}
                            </div>
                            <div className="pl-stat-item view">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                {post.viewCount}
                            </div>
                        </div>

                        {/* More Dots */}
                        <div className="pl-more-dots">
                             <svg width="3" height="14" viewBox="0 0 3 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.75 6.75C0.75 7.16421 1.08579 7.5 1.5 7.5C1.91421 7.5 2.25 7.16421 2.25 6.75C2.25 6.33579 1.91421 6 1.5 6C1.08579 6 0.75 6.33579 0.75 6.75Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M0.75 12C0.75 12.4142 1.08579 12.75 1.5 12.75C1.91421 12.75 2.25 12.4142 2.25 12C2.25 11.5858 1.91421 11.25 1.5 11.25C1.08579 11.25 0.75 11.5858 0.75 12Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M0.75 1.5C0.75 1.91421 1.08579 2.25 1.5 2.25C1.91421 2.25 2.25 1.91421 2.25 1.5C2.25 1.08579 1.91421 0.75 1.5 0.75C1.08579 0.75 0.75 1.08579 0.75 1.5Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                ))}

                {activeTab === 'comments' && likedComments.map(comment => (
                    <div key={comment.id} className="pl-comment-card">
                        {/* Profile/Icon */}
                        <div className="pl-comment-profile-bg">
                            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="13.5" cy="13.5" r="13" fill="#FFF9EA" stroke="#FD9800"/>
                            </svg>
                        </div>
                        <div className="pl-comment-emoji">{comment.icon}</div>

                        {/* Author */}
                        <div className="pl-comment-author">{comment.author}</div>

                        {/* Content */}
                        <div className="pl-comment-content">{comment.content}</div>

                        {/* Date */}
                        <div className="pl-comment-date">{comment.date}</div>

                        {/* Actions (Heart, Message) */}
                        <div className="pl-comment-actions">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.3069 1.91992C12.5602 1.91992 14.0743 4.06468 14.0743 6.0655C14.0743 10.1175 7.79052 13.4354 7.67679 13.4354C7.56306 13.4354 1.2793 10.1175 1.2793 6.0655C1.2793 4.06468 2.79337 1.91992 5.04671 1.91992C6.34043 1.91992 7.18632 2.57487 7.67679 3.15064C8.16727 2.57487 9.01316 1.91992 10.3069 1.91992Z" fill="#FF4646" stroke="#FF4646" strokeWidth="1.706" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.4354 7.67766C13.4354 10.8576 10.8576 13.4354 7.67766 13.4354C6.91179 13.4354 6.18084 13.2859 5.51243 13.0144C5.3845 12.9625 5.32053 12.9365 5.26883 12.9249C5.21825 12.9136 5.18082 12.9094 5.12899 12.9094C5.076 12.9094 5.01828 12.919 4.90285 12.9382L2.62669 13.3176C2.38833 13.3573 2.26916 13.3772 2.18298 13.3402C2.10755 13.3079 2.04744 13.2478 2.01509 13.1723C1.97813 13.0862 1.99799 12.967 2.03772 12.7286L2.41708 10.4525C2.43632 10.337 2.44593 10.2793 2.44593 10.2263C2.44592 10.1745 2.44178 10.1371 2.43044 10.0865C2.41885 10.0348 2.39287 9.97083 2.34092 9.8429C2.06945 9.17448 1.91992 8.44353 1.91992 7.67766C1.91992 4.49775 4.49775 1.91992 7.67766 1.91992C10.8576 1.91992 13.4354 4.49775 13.4354 7.67766Z" stroke="#959595" strokeWidth="1.706" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        
                        {/* More Dots */}
                        <div className="pl-comment-menu">
                            <svg width="3" height="14" viewBox="0 0 3 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.75 6.75C0.75 7.16421 1.08579 7.5 1.5 7.5C1.91421 7.5 2.25 7.16421 2.25 6.75C2.25 6.33579 1.91421 6 1.5 6C1.08579 6 0.75 6.33579 0.75 6.75Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M0.75 12C0.75 12.4142 1.08579 12.75 1.5 12.75C1.91421 12.75 2.25 12.4142 2.25 12C2.25 11.5858 1.91421 11.25 1.5 11.25C1.08579 11.25 0.75 11.5858 0.75 12Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M0.75 1.5C0.75 1.91421 1.08579 2.25 1.5 2.25C1.91421 2.25 2.25 1.91421 2.25 1.5C2.25 1.08579 1.91421 0.75 1.5 0.75C1.08579 0.75 0.75 1.08579 0.75 1.5Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
