import React, { useState } from 'react';
import './post-detail.css';

export function PostDetail({ onNavigate }) {
    // States: 'default', 'typing', 'commented'
    const [viewState, setViewState] = useState('default');
    const [commentText, setCommentText] = useState('');

    const handleInputClick = () => {
        setViewState('typing');
    };

    const handleBackgroundClick = () => {
        if (viewState === 'typing') {
            setViewState('default');
        }
    };

    // Simulate submitting a comment
    const handleSubmit = () => {
        setViewState('commented');
    };

    return (
        <div className="post-detail-container">
            {/* Header */}
            <div className="pd-header">
                <div onClick={() => onNavigate('community')} style={{cursor: 'pointer'}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className="pd-header-title">카테고리</div>
                <div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="pd-scroll-area" onClick={handleBackgroundClick}>
                
                {/* Author Info */}
                <div className="pd-author-section">
                    <div className="pd-avatar">
                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                            <circle cx="19" cy="19" r="19" fill="#D9D9D9"/>
                        </svg>
                    </div>
                    <div className="pd-author-info">
                        <div className="pd-category-badge">카테고리</div>
                        <div className="pd-author-name">작성자 정보</div>
                    </div>
                </div>

                {/* Post Content */}
                <div className="pd-title">제목</div>
                <div className="pd-content">내용</div>
                
                <div className="pd-time">게시글 작성 시간 (ex, 2025. 12. 11. 18:30)</div>
                
                {/* Stats Bar */}
                <div className="pd-stats-bar">
                    <div className="pd-stat-item">
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <path d="M16.5829 3.08789C20.2083 3.08789 22.6442 6.53856 22.6442 9.75764C22.6442 16.2769 12.5344 21.615 12.3514 21.615C12.1684 21.615 2.05859 16.2769 2.05859 9.75764C2.05859 6.53856 4.49456 3.08789 8.11992 3.08789C10.2014 3.08789 11.5623 4.14162 12.3514 5.06797C13.1405 4.14162 14.5015 3.08789 16.5829 3.08789Z" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>좋아요</span>
                    </div>
                    <div className="pd-stat-item">
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <path d="M21.615 12.3514C21.615 17.4675 17.4675 21.615 12.3514 21.615C11.1192 21.615 9.94322 21.3744 8.86781 20.9376C8.66199 20.854 8.55908 20.8122 8.47589 20.7936C8.39451 20.7754 8.33429 20.7687 8.2509 20.7687C8.16565 20.7687 8.07279 20.7841 7.88707 20.8151L4.225 21.4254C3.84151 21.4893 3.64977 21.5213 3.51111 21.4618C3.38976 21.4098 3.29306 21.3131 3.24101 21.1917C3.18154 21.0531 3.21349 20.8613 3.27741 20.4778L3.88775 16.8158C3.91871 16.6301 3.93418 16.5372 3.93417 16.4519C3.93416 16.3685 3.92749 16.3083 3.90925 16.227C3.89061 16.1438 3.84881 16.0409 3.76522 15.835C3.32847 14.7596 3.08789 13.5836 3.08789 12.3514C3.08789 7.23531 7.23531 3.08789 12.3514 3.08789C17.4675 3.08789 21.615 7.23531 21.615 12.3514Z" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>댓글</span>
                    </div>
                    <div className="pd-stat-item">
                        <span>저장</span>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <path d="M19.5473 21.6043L12.3456 16.4603L5.14404 21.6043V5.14354C5.14404 4.59783 5.36083 4.07447 5.7467 3.68859C6.13258 3.30272 6.65593 3.08594 7.20164 3.08594H17.4897C18.0354 3.08594 18.5587 3.30272 18.9446 3.68859C19.3305 4.07447 19.5473 4.59783 19.5473 5.14354V21.6043Z" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>

                {/* Divider Line / Gap */}
                <div style={{height: '20px'}}></div>

                {/* Comment Section View */}
                {viewState !== 'commented' && (
                    <div className="pd-empty-comments">
                        <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
                            <path d="M46.4584 26.5476C46.4584 37.544 37.544 46.4584 26.5476 46.4584C23.8991 46.4584 21.3714 45.9413 19.06 45.0026C18.6176 44.8229 18.3964 44.7331 18.2176 44.693C18.0427 44.6538 17.9132 44.6395 17.734 44.6394C17.5507 44.6394 17.3512 44.6727 16.952 44.7392L9.0808 46.0511C8.25654 46.1884 7.84441 46.2571 7.54639 46.1293C7.28555 46.0174 7.0777 45.8096 6.96582 45.5487C6.838 45.2507 6.90669 44.8386 7.04407 44.0143L8.35593 36.1432C8.42246 35.744 8.45572 35.5444 8.4557 35.3611C8.45568 35.1819 8.44134 35.0525 8.40214 34.8776C8.36206 34.6988 8.27223 34.4776 8.09256 34.0352C7.15382 31.7237 6.63672 29.196 6.63672 26.5476C6.63672 15.5511 15.5511 6.63672 26.5476 6.63672C37.544 6.63672 46.4584 15.5511 46.4584 26.5476Z" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="pd-empty-text">첫 댓글을 남겨주세요</div>
                        
                        {/* View Count Small */}
                        <div className="pd-view-count">
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                                <g clipPath="url(#clip0_3_2014)">
                                <path d="M0.671875 8.06213C0.671875 8.06213 3.35919 2.6875 8.06199 2.6875C12.7648 2.6875 15.4521 8.06213 15.4521 8.06213C15.4521 8.06213 12.7648 13.4368 8.06199 13.4368C3.35919 13.4368 0.671875 8.06213 0.671875 8.06213Z" stroke="#959595" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8.06199 10.0776C9.17512 10.0776 10.0775 9.17526 10.0775 8.06213C10.0775 6.94901 9.17512 6.04665 8.06199 6.04665C6.94887 6.04665 6.04651 6.94901 6.04651 8.06213C6.04651 9.17526 6.94887 10.0776 8.06199 10.0776Z" stroke="#959595" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_3_2014">
                                <rect width="16.1239" height="16.1239" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg>
                            <span>조회수 24</span>
                        </div>
                    </div>
                )}

                {/* Commented State */}
                {viewState === 'commented' && (
                    <div className="pd-comment-card">
                       {/* Red Warning (as per snippet design) */}
                       <div className="pd-warning-text">500이내로 입력해주세요.</div>
                       <div className="pd-comment-body">
                           댓글이 입력되었습니다. 댓글이 입력되었습니다. 댓글이 입력되었습니다.
                       </div>
                       <div className="pd-comment-meta">
                           <span className="pd-meta-author">익명</span>
                           <div className="pd-comment-icon">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="#F5F5F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                           </div>
                           <div className="pd-comment-btn">댓글</div>
                       </div>
                    </div>
                )}

                {/* Spacer for keyboard */}
                <div style={{ height: viewState === 'typing' ? '300px' : '80px' }}></div>
            </div>

            {/* Bottom Input Area */}
            <div className="pd-bottom-bar" style={{ bottom: viewState === 'typing' ? '340px' : '20px' }}>
                <div className="pd-input-container">
                    <div className="pd-anon-toggle">
                        <div className="pd-check-icon">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="#F5F5F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span>익명</span>
                    </div>
                    <div className="pd-input-placeholder" onClick={handleInputClick}>
                        댓글을 달아주세요
                    </div>
                    <div className="pd-submit-btn" onClick={handleSubmit}>
                        댓글
                    </div>
                </div>
            </div>

            {viewState === 'typing' && (
                <div className="pd-keyboard-overlay">
                    {/* Placeholder for keyboard to avoid massive SVG bloat without Tailwind */}
                    <img src="https://placehold.co/393x290/e5e5e5/a3a3a3?text=Keyboard+View" alt="Keyboard" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                </div>
            )}
        </div>
    );
}
