import React, { useState } from 'react';
import './profile.css';

export function ProfileMyActivity({ onBack }) {
    const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'comments'
    const [openMenuId, setOpenMenuId] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [view, setView] = useState('list'); // 'list' | 'postEdit' | 'commentEdit'

    const [myPosts, setMyPosts] = useState([
        { id: 1, title: '제목', content: '내용', category: '카테고리', time: '0분 전', likeCount: 0, commentCount: 0, viewCount: 0 },
        { id: 2, title: '제목', content: '내용', category: '카테고리', time: '10분 전', likeCount: 5, commentCount: 2, viewCount: 15 },
        { id: 3, title: '제목', content: '내용', category: '카테고리', time: '1시간 전', likeCount: 12, commentCount: 8, viewCount: 45 }
    ]);
    
    const [myComments, setMyComments] = useState([
        { id: 1, content: '댓글 내용...', time: '댓글 작성 시간', postTitle: '게시글 제목', postContent: '게시글 본문...' },
        { id: 2, content: '두 번째 댓글...', time: '댓글 작성 시간', postTitle: '또 다른 게시글', postContent: '본문...' },
    ]);

    const toggleMenu = (e, id) => {
        e.stopPropagation();
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const handlePostClick = (post) => {
        setSelectedPost(post);
        setView('postEdit');
    };

    if (view === 'postEdit') {
        return (
            <div className="profile-container">
                <div className="editpost-header-left" onClick={() => setView('list')}>취소</div>
                <div className="editpost-header-title">수정하기</div>
                <div className="editpost-header-right" onClick={() => setView('list')}>완료</div>

                <div className="editpost-category-row">
                    <div className="editpost-cat-item">카테고리</div>
                    <div className="editpost-cat-item active">직장 생활</div>
                    <div className="editpost-cat-item">인간관계</div>
                    <div className="editpost-cat-item">취미/여가</div>
                </div>

                <div className="editpost-divider-1"></div>
                
                <input type="text" className="editpost-title-input" defaultValue={selectedPost?.title || "제목"} />

                <div className="editpost-divider-2"></div>
                
                <textarea className="editpost-content-area" defaultValue={selectedPost?.content || "내용"} />

                <div className="editpost-bot-divider"></div>
                <div className="editpost-anon-toggle">
                     <span style={{fontSize:'12px', fontWeight:'700', color:'#A3A3A3'}}>익명</span>
                     <div className="editpost-anon-check">
                         <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="#F5F5F5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                     </div>
                </div>

                <div className="editpost-comment-bar">
                    <span style={{fontSize:'12px', fontWeight:'600', color:'#D6D3D1'}}>댓글을 달아주세요</span>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container" onClick={() => setOpenMenuId(null)}>
            <div className="edit-header-title">내가 쓴 글</div>
            <div className="edit-back-arrow" onClick={onBack}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            <div className="mypost-tab-container">
                <div 
                    className={`mypost-tab ${activeTab === 'posts' ? 'active' : 'inactive'}`}
                    onClick={() => setActiveTab('posts')}
                >
                    게시글
                    {activeTab === 'posts' ? <div className="mypost-tab-indicator"></div> : <div className="mypost-tab-indicator-inactive"></div>}
                </div>
                <div 
                    className={`mypost-tab ${activeTab === 'comments' ? 'active' : 'inactive'}`}
                    onClick={() => setActiveTab('comments')}
                >
                    댓글
                    {activeTab === 'comments' ? <div className="mypost-tab-indicator"></div> : <div className="mypost-tab-indicator-inactive"></div>}
                </div>
            </div>

            <div className="mypost-filter-line">
                <div className="mypost-filter-btn">전체</div>
                <div className="mypost-filter-btn" style={{left:'325px', position:'absolute'}}>최신순</div>
            </div>

             {activeTab === 'posts' ? (
                <div className="mypost-list-container">
                    {myPosts.length > 0 ? myPosts.map(post => (
                        <div key={post.id} className="mypost-card" onClick={() => handlePostClick(post)}>
                            <div className="mypost-card-category-wrapper">
                                <div className="mypost-card-category">{post.category}</div>
                            </div>
                            <div className="mypost-card-title">{post.title}</div>
                            <div className="mypost-card-content">{post.content}</div>
                            <div className="mypost-card-time">{post.time}</div>
                            
                            <div style={{position:'absolute', top:'17px', left:'177px', fontSize:'10px', fontWeight:'600'}}>작성자 정보</div>
                            <div style={{position:'absolute', top:'14px', left:'87px'}}>
                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none"><circle cx="14.5" cy="14.5" r="14.5" fill="#D9D9D9"/></svg>
                            </div>

                            <div className="mypost-card-footer">
                                <div className="mypost-stat-group">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15.75 9C15.75 12.7279 12.7279 15.75 9 15.75C8.10214 15.75 7.24523 15.5747 6.46162 15.2565C6.31164 15.1955 6.23666 15.1651 6.17604 15.1515C6.11675 15.1382 6.07286 15.1334 6.0121 15.1333C5.94998 15.1333 5.88231 15.1446 5.74699 15.1672L3.07857 15.6119C2.79914 15.6585 2.65942 15.6818 2.55839 15.6384C2.46996 15.6005 2.3995 15.53 2.36157 15.4416C2.31824 15.3406 2.34152 15.2009 2.3881 14.9214L2.83283 12.253C2.85539 12.1177 2.86666 12.05 2.86666 11.9879C2.86665 11.9271 2.86179 11.8833 2.8485 11.824C2.83491 11.7633 2.80446 11.6884 2.74355 11.5384C2.4253 10.7548 2.25 9.89786 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25C12.7279 2.25 15.75 5.27208 15.75 9Z" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    <div className="mypost-stat-text">좋아요</div>
                                </div>
                                <div className="mypost-stat-group">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    <div className="mypost-stat-text">댓글</div>
                                </div>
                                <div className="mypost-stat-group">
                                     <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M12.0833 2.25C14.725 2.25 16.5 4.76438 16.5 7.11C16.5 11.8603 9.13333 15.75 9 15.75C8.86667 15.75 1.5 11.8603 1.5 7.11C1.5 4.76438 3.275 2.25 5.91667 2.25C7.43333 2.25 8.425 3.01781 9 3.69281C9.575 3.01781 10.5667 2.25 12.0833 2.25Z" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    <div className="mypost-stat-text">조회수</div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="mypost-empty-container">
                            <div className="mypost-empty-text">작성된 게시글이 없습니다.</div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="mypost-comment-list-container">
                    {/* Simplified Comments Rendering for brevity of this split */}
                    {myComments.length > 0 ? myComments.map(comment => (
                        <div key={comment.id} className="mypost-comment-card">
                             <div className="comment-card-header">
                                <div className="comment-user-avatar"></div>
                                <div className="comment-user-info">작성자 정보</div>
                            </div>
                            <div className="comment-content">{comment.content}</div>
                            <div className="comment-time">{comment.time}</div>
                             <div className="comment-more-btn" onClick={(e) => toggleMenu(e, comment.id)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="2" fill="#D9D9D9"/>
                                    <circle cx="12" cy="5" r="2" fill="#D9D9D9"/>
                                    <circle cx="12" cy="19" r="2" fill="#D9D9D9"/>
                                </svg>
                            </div>
                             {openMenuId === comment.id && (
                                <div className="comment-action-menu">
                                    <div className="comment-action-item">수정</div>
                                    <div className="comment-action-item">삭제</div>
                                </div>
                            )}
                        </div>
                    )) : (
                        <div className="mypost-empty-container">
                            <div className="myost-empty-text" style={{color:'#A3A3A3', fontSize:'20px', fontWeight:'600'}}>작성된 댓글이 없습니다.</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
