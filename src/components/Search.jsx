import React from 'react';
import './search.css';

export function Search({ onNavigate }) {
    return (
        <div className="search-container">
            {/* Back Button */}
            <div className="search-back-btn" onClick={() => onNavigate('community')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            {/* Title */}
            <div className="search-title">검색</div>

            {/* Search Input Area */}
            <div className="search-input-area">
                {/* Category Dropdown */}
                <div className="search-category-dropdown">
                    <div className="search-cat-text">전체</div>
                    <div className="search-cat-icon">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>

                {/* Input Field */}
                <div className="search-text-input">
                    <div className="search-input-icon">
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                            <path d="M16.625 16.625L11.8751 11.875M13.4583 7.91667C13.4583 10.9772 10.9772 13.4583 7.91667 13.4583C4.85609 13.4583 2.375 10.9772 2.375 7.91667C2.375 4.85609 4.85609 2.375 7.91667 2.375C10.9772 2.375 13.4583 4.85609 13.4583 7.91667Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <input type="text" className="search-real-input" placeholder="검색" />
                </div>
            </div>

            {/* Recent Searches Header */}
            <div className="recent-search-header">
                <div className="recent-title">최근 검색어</div>
                <div className="delete-all-btn">전체 삭제</div>
            </div>

            {/* Recent Search Items */}
            <div className="recent-item" style={{ top: '208px' }}>
                <div className="recent-item-text">최근 검색어</div>
                <div className="recent-delete-icon">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="#B3B3B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
            <div className="recent-item" style={{ top: '246px' }}>
                <div className="recent-item-text">최근 검색어</div>
                <div className="recent-delete-icon">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="#B3B3B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>

            {/* Popular Searches Header */}
            <div className="popular-header">
                <div className="popular-title">인기 검색어</div>
                <div className="popular-time">시간 기준(ex, 오전 10시 기준)</div>
            </div>

            {/* Popular Grid Container */}
            <div className="popular-container">
                {/* Items generated based on snippet */}
                {[
                    { rank: 1, text: '인기 검색어', trend: 'down', top: 30 },
                    { rank: 2, text: '인기 검색어', trend: 'down', top: 69 },
                    { rank: 3, text: '인기 검색어', trend: 'down', top: 108 },
                    { rank: 4, text: '인기 검색어', trend: 'down', top: 147 },
                    { rank: 5, text: '인기 검색어', trend: 'up', top: 186 },
                    { rank: 6, text: '인기 검색어', trend: 'down', top: 225 },
                    { rank: 7, text: '인기 검색어', trend: 'down', top: 264 },
                    { rank: 8, text: '인기 검색어', trend: 'up', top: 303 },
                    { rank: 9, text: '인기 검색어', trend: 'down', top: 342 },
                    { rank: 10, text: '인기 검색어', trend: 'down', top: 381 },
                ].map((item, idx) => (
                    <React.Fragment key={idx}>
                        <div className="popular-rank" style={{ top: `${item.top}px` }}>{item.rank}</div>
                        <div className="popular-text" style={{ top: `${item.top}px` }}>{item.text}</div>
                        <div className="popular-trend" style={{ top: `${item.top - 3}px` }}>
                            {item.trend === 'down' ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 9L7 14H17L12 9Z" fill="#FF0000"/>
                                </svg>
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 15L7 10H17L12 15Z" fill="#008CFF"/>
                                </svg>
                            )}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
