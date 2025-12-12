import React, { useState } from 'react';
import './create-post.css';

export function CreatePost({ onNavigate }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('직장 생활');
    const [isAnonymous, setIsAnonymous] = useState(true);

    const handleComplete = () => {
        // Here you would normally submit the post data
        onNavigate('community');
    };

    return (
        <div className="create-post-container">
            {/* Header */}
            <div className="cp-screen-header">
                <div className="cp-cancel-btn" onClick={() => onNavigate('community')}>취소</div>
                <div className="cp-screen-title">글쓰기</div>
                <div className="cp-complete-btn" onClick={handleComplete}>완료</div>
            </div>

            {/* Category Selection */}
            <div className="cp-category-row">
                <div className="cp-category-label">카테고리</div>
                <div className="cp-category-options">
                    <div 
                        className={`cp-cat-option ${category === '직장 생활' ? 'active' : ''}`}
                        onClick={() => setCategory('직장 생활')}
                    >
                        직장 생활
                    </div>
                    <div 
                        className={`cp-cat-option ${category === '인간관계' ? 'active' : ''}`}
                        onClick={() => setCategory('인간관계')}
                    >
                        인간관계
                    </div>
                    <div 
                        className={`cp-cat-option ${category === '취미/여가' ? 'active' : ''}`}
                        onClick={() => setCategory('취미/여가')}
                    >
                        취미/여가
                    </div>
                </div>
            </div>

            {/* Dividers are handled by CSS borders typically, but snippet used absolute divs. We'll use border-bottom. */}
            
            {/* Title Input */}
            <div className="cp-input-group title-group">
                <input 
                    type="text" 
                    className="cp-title-input" 
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* Content Input */}
            <div className="cp-input-group content-group">
                <textarea 
                    className="cp-content-input" 
                    placeholder="내용 작성 공간&#13;&#10;내용 작성 시 주의 사항"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={500}
                />
                <div className="cp-char-count">{content.length}/500자</div>
            </div>

            {/* Bottom Bar (Anonymous) */}
            <div className="cp-bottom-toolbar">
                <div className="cp-anon-toggle" onClick={() => setIsAnonymous(!isAnonymous)}>
                    <div className="cp-check-box">
                        {isAnonymous && (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="#F5F5F5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        )}
                    </div>
                    <div className="cp-anon-label">익명</div>
                </div>
            </div>
        </div>
    );
}
