import React, { useState } from 'react';
import './profile.css';

export function ProfileLiked({ onBack }) {
    const [likedTab, setLikedTab] = useState('posts'); // 'posts' | 'comments'
    const [likedPosts, setLikedPosts] = useState([
        { id: 101, title: '제목', content: '내용', category: '카테고리', time: '10분 전', author: '작성자', likes: 10, comments: 5, views: 100 },
        { id: 102, title: '제목', content: '내용', category: '카테고리', time: '1시간 전', author: '작성자', likes: 23, comments: 8, views: 150 },
        { id: 103, title: '제목', content: '내용', category: '카테고리', time: '1일 전', author: '작성자', likes: 5, comments: 2, views: 50 },
    ]);
    const [likedComments, setLikedComments] = useState([]);

    return (
        <div className="profile-container">
             <div className="edit-back-arrow" onClick={onBack} style={{top:'61px', zIndex:'50'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <div className="liked-header-title">좋아요</div>

            <div className="liked-tab-container">
                <div 
                    className={`liked-tab ${likedTab === 'posts' ? 'active' : ''}`}
                    onClick={() => setLikedTab('posts')}
                >
                    게시글
                    {likedTab === 'posts' ? <div className="liked-tab-indicator"></div> : <div className="liked-tab-indicator-inactive"></div>}
                </div>
                <div 
                    className={`liked-tab ${likedTab === 'comments' ? 'active' : ''}`}
                    onClick={() => setLikedTab('comments')}
                >
                    댓글
                    {likedTab === 'comments' ? <div className="liked-tab-indicator"></div> : <div className="liked-tab-indicator-inactive"></div>}
                </div>
            </div>

            <div className="liked-filter-line">
                <div className="liked-filter-btn">전체</div>
                <div className="liked-filter-dropdown-btn">
                     <div style={{fontSize:'12px', fontWeight:'600', color:'black', position:'absolute', left:'10px', top:'7px'}}> </div>
                     <div style={{fontSize:'12px', fontWeight:'600', color:'black', position:'absolute', left:'7px', top:'6px'}}> </div>
                     <div style={{fontSize:'12px', fontWeight:'600', color:'black', position:'absolute', right:'30px', top:'6px'}}>최신순</div>
                     <div className="liked-filter-dropdown-icon">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15.75 15.75L11.2501 11.25M12.75 7.5C12.75 10.3995 10.3995 12.75 7.5 12.75C4.6005 12.75 2.25 10.3995 2.25 7.5C2.25 4.6005 4.6005 2.25 7.5 2.25C10.3995 2.25 12.75 4.6005 12.75 7.5Z" stroke="#656565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                     </div>
                </div>
            </div>

            <div className="liked-list-container">
                {likedTab === 'posts' ? (
                    likedPosts.length > 0 ? (
                        likedPosts.map(post => (
                            <div key={post.id} className="liked-card">
                                <div className="liked-card-cat-badge">{post.category}</div>
                                <div className="liked-author-avatar">
                                    <svg width="29" height="29" viewBox="0 0 29 29" fill="none"><circle cx="14.5" cy="14.5" r="14.5" fill="#D9D9D9"/></svg>
                                </div>
                                <div className="liked-author-info">작성자 정보</div>
                                
                                <div className="liked-card-title">{post.title}</div>
                                <div className="liked-card-time">{post.time}</div>
                                <div className="liked-card-content">{post.content}</div>

                                <div className="liked-card-footer">
                                    <div className="liked-stat">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15.75 9C15.75 12.7279 12.7279 15.75 9 15.75C8.10214 15.75 7.24523 15.5747 6.46162 15.2565C6.31164 15.1955 6.23666 15.1651 6.17604 15.1515C6.11675 15.1382 6.07286 15.1334 6.0121 15.1333C5.94998 15.1333 5.88231 15.1446 5.74699 15.1672L3.07857 15.6119C2.79914 15.6585 2.65942 15.6818 2.55839 15.6384C2.46996 15.6005 2.3995 15.53 2.36157 15.4416C2.31824 15.3406 2.34152 15.2009 2.3881 14.9214L2.83283 12.253C2.85539 12.1177 2.86666 12.05 2.86666 11.9879C2.86665 11.9271 2.86179 11.8833 2.8485 11.824C2.83491 11.7633 2.80446 11.6884 2.74355 11.5384C2.4253 10.7548 2.25 9.89786 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25C12.7279 2.25 15.75 5.27208 15.75 9Z" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        좋아요
                                    </div>
                                    <div className="liked-stat">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        댓글
                                    </div>
                                    <div className="liked-stat">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M12.0833 2.25C14.725 2.25 16.5 4.76438 16.5 7.11C16.5 11.8603 9.13333 15.75 9 15.75C8.86667 15.75 1.5 11.8603 1.5 7.11C1.5 4.76438 3.275 2.25 5.91667 2.25C7.43333 2.25 8.425 3.01781 9 3.69281C9.575 3.01781 10.5667 2.25 12.0833 2.25Z" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        조회수
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="liked-empty-text">좋아요한 게시글이 없습니다.</div>
                    )
                ) : (
                    likedComments.length > 0 ? (
                        <div>{/* List of liked comments */}</div>
                    ) : (
                        <div className="liked-empty-text">좋아요한 댓글이 없습니다.</div>
                    )
                )}
            </div>
        </div>
    );
}
