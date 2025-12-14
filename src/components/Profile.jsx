import React, { useState } from 'react';
import './profile.css';

export function Profile({ onNavigate }) {
    const [view, setView] = useState('main'); // 'main' | 'edit' | 'myPosts' | 'myPostEdit'
    const [showUnsavedModal, setShowUnsavedModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '이소민',
        job: '대리',
        year: '3년차',
        industry: '마케팅'
    });
    const [isDirty, setIsDirty] = useState(false);

    const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'comments'
    const [openMenuId, setOpenMenuId] = useState(null);

    // Dummy data for My Posts
    const [myPosts, setMyPosts] = useState([
        {
            id: 1,
            title: '제목',
            content: '내용',
            category: '카테고리',
            time: '0분 전',
            likeCount: 0,
            commentCount: 0,
            viewCount: 0
        },
        {
            id: 2,
            title: '제목',
            content: '내용',
            category: '카테고리',
            time: '10분 전',
            likeCount: 5,
            commentCount: 2,
            viewCount: 15
        },
        {
            id: 3,
            title: '제목',
            content: '내용',
            category: '카테고리',
            time: '1시간 전',
            likeCount: 12,
            commentCount: 8,
            viewCount: 45
        }
    ]);
    
    // Dummy data for My Comments
    const [myComments, setMyComments] = useState([
        {
            id: 1,
            content: '댓글 내용입니다. 댓글 내용이 길어지면 두 줄까지 표시됩니다.',
            time: '댓글 작성 시간',
            postTitle: '게시글 제목',
            postContent: '게시글 본문 내용이 여기에 들어갑니다. 게시글 본문 내용이 여기에 들어갑니다.',
        },
        {
            id: 2,
            content: '두 번째 댓글입니다.',
            time: '댓글 작성 시간',
            postTitle: '또 다른 게시글',
            postContent: '게시글 본문 내용...',
        },
        {
            id: 3,
            content: '세 번째 댓글입니다.',
            time: '댓글 작성 시간',
            postTitle: '마지막 게시글',
            postContent: '게시글 본문 내용...',
        }
    ]);
    
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedComment, setSelectedComment] = useState(null);
    const [editCommentContent, setEditCommentContent] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedContentTypes, setSelectedContentTypes] = useState(['text', 'audio']); // Default selection based on snippet request
    const [showOtherTypeModal, setShowOtherTypeModal] = useState(false);
    const [showOtherTypeCompleteModal, setShowOtherTypeCompleteModal] = useState(false);
    const [otherTypeOpinion, setOtherTypeOpinion] = useState('');

    const toggleContentType = (type) => {
        if (selectedContentTypes.includes(type)) {
            setSelectedContentTypes(prev => prev.filter(t => t !== type));
        } else {
            setSelectedContentTypes(prev => [...prev, type]);
        }
    };

    const handleOtherTypeSubmit = () => {
        setShowOtherTypeModal(false);
        setShowOtherTypeCompleteModal(true);
    };

    /* ================== Saved View State ================== */
    const [savedTab, setSavedTab] = useState('posts'); // 'posts' | 'content'
    const [savedFilter, setSavedFilter] = useState('all'); // 'all' | 'latest'
    const [savedContentFilter, setSavedContentFilter] = useState('all'); // 'all' | 'text' | 'video' | 'audio'
    const [isSavedFilterOpen, setIsSavedFilterOpen] = useState(false);
    
    // Dummy Data for Saved Items
    const [savedPosts, setSavedPosts] = useState([
        /* Uncomment to test empty state: */
        // [],
        { id: 101, title: '내용', content: '내용이 들어갑니다...', category: '카테고리', time: '10분 전', likeCount: 5, commentCount: 2, viewCount: 24, author:'작성자' },
        { id: 102, title: '다른 내용', content: '또 다른 내용...', category: '카테고리', time: '1시간 전', likeCount: 10, commentCount: 5, viewCount: 100, author:'작성자' },
        { id: 103, title: '세번째 내용', content: '세번째 내용...', category: '카테고리', time: '2시간 전', likeCount: 0, commentCount: 0, viewCount: 1, author:'작성자' }
    ]);

    const [savedContents, setSavedContents] = useState([
        // [], 
        { id: 201, title: '내용', content: '콘텐츠 내용...', category: '카테고리', type: 'text', time: '5분 전', likeCount: 5, commentCount: 2, viewCount: 24 },
        { id: 202, title: '영상 콘텐츠', content: '영상...', category: '카테고리', type: 'video', time: '15분 전', likeCount: 20, commentCount: 10, viewCount: 300 },
        { id: 203, title: '음성 콘텐츠', content: '음성...', category: '카테고리', type: 'audio', time: '1일 전', likeCount: 3, commentCount: 1, viewCount: 50 },
    ]);

    const [selectedSavedItem, setSelectedSavedItem] = useState(null);

    const handleSavedItemClick = (item, type) => {
        setSelectedSavedItem(item);
        if (type === 'post') setView('savedPostDetail');
        else setView('savedContentDetail');
    };

    const handleUnsave = (e, id, type) => {
        e.stopPropagation();
        if (type === 'post') {
            setSavedPosts(prev => prev.filter(p => p.id !== id));
        } else {
            setSavedContents(prev => prev.filter(c => c.id !== id));
        }
        // If needed show toast or modal
    };


    /* ================== Render: Edit Profile ================== */
    if (view === 'edit') {
        return (
            <div className="profile-container">
                <div className="edit-header-title">프로필 정보 수정</div>
                <div className="edit-back-arrow" onClick={handleBackFromEdit}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                <div className="edit-label label-name">이름</div>
                <div className="edit-input-wrapper input-name">
                    <input 
                        type="text" 
                        className="edit-input" 
                        value={formData.name} 
                        onChange={(e) => handleInputChange('name', e.target.value)} 
                    />
                </div>

                <div className="edit-label label-job">직급</div>
                <div className="edit-input-wrapper input-job">
                    <input 
                        type="text" 
                        className="edit-input" 
                        value={formData.job} 
                        onChange={(e) => handleInputChange('job', e.target.value)} 
                    />
                </div>

                <div className="edit-label label-year">연차</div>
                <div className="edit-input-wrapper input-year">
                    <input 
                        type="text" 
                        className="edit-input" 
                        value={formData.year} 
                        onChange={(e) => handleInputChange('year', e.target.value)} 
                    />
                </div>

                <div className="edit-label label-industry">산업 분야</div>
                <div className="edit-input-wrapper input-industry">
                    <input 
                        type="text" 
                        className="edit-input" 
                        value={formData.industry} 
                        onChange={(e) => handleInputChange('industry', e.target.value)} 
                    />
                </div>

                <div className="edit-save-btn" onClick={handleSave}>
                    <div className="edit-save-text">저장</div>
                </div>

                {showUnsavedModal && (
                    <div className="modal-overlay">
                        <div className="modal-card">
                            <div className="modal-message">
                                수정 사항이 저장되지 않았습니다.<br/>계속 진행하시겠습니까?
                            </div>
                            <div className="modal-btn-container">
                                <div className="modal-btn-yes" onClick={handleConfirmLeave}>
                                    <div className="modal-btn-text">예</div>
                                </div>
                                <div className="modal-btn-no" onClick={handleCancelLeave}>
                                    <div className="modal-btn-text">아니오</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
    
    /* ================== Render: Comment Edit (Post Detail) ================== */
    if (view === 'commentEdit' && selectedComment) {
        return (
            <div className="comment-edit-container">
                <div className="edit-back-arrow" onClick={() => setView('myPosts')} style={{top:'55px'}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className="comment-edit-header-cat">카테고리</div>
                
                <div className="comment-edit-post-section">
                    <div className="comment-edit-title">{selectedComment.postTitle}</div>
                    <div className="comment-edit-content">{selectedComment.postContent}</div>
                    
                    <div className="comment-edit-stats">
                        <div className="comment-edit-stat-item">좋아요 12</div>
                        <div className="comment-edit-stat-item">댓글 4</div>
                        <div className="comment-edit-stat-item">조회수 200</div>
                    </div>
                </div>

                {/* Bottom Input */}
                <div className="comment-edit-bottom-bar">
                    <div style={{width:'20px', height:'20px', background:'#333', borderRadius:'3px'}}></div>
                    <input 
                        type="text" 
                        className="comment-edit-input" 
                        value={editCommentContent} 
                        onChange={(e) => setEditCommentContent(e.target.value)}
                    />
                    <div className="comment-edit-anon">
                         <span style={{fontSize:'12px', fontWeight:'700', color:'#A3A3A3'}}>익명</span>
                    </div>
                    <div style={{marginLeft:'10px', fontSize:'12px', fontWeight:'600', color:'black', cursor:'pointer'}} onClick={handleUpdateComment}>댓글</div>
                </div>
            </div>
        );
    }

    /* ================== Render: Content Preference ================== */
    if (view === 'contentPreference') {
        return (
            <div className="profile-container">
                <div className="edit-back-arrow" onClick={() => setView('main')} style={{top:'55px'}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className="content-pref-header-title">콘텐츠</div>
                
                <div className="content-pref-subtitle">선호하는 콘텐츠를 선택해주세요.</div>
                
                <div className="content-pref-option-container">
                    {/* Video Option */}
                    <div 
                        className="content-pref-card" 
                        onClick={() => toggleContentType('video')}
                        style={{background: selectedContentTypes.includes('video') ? '#D5D5D5' : '#F6F6F6'}}
                    >
                        <div className="content-pref-checkbox">
                             {selectedContentTypes.includes('video') ? (
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="0.5" y="0.5" width="27" height="27" rx="4.5" fill="#C1C1C1" stroke="#CDCDCD"/><path d="M14.1667 4.25L6.375 12.0417L2.83333 8.5" transform="translate(5 5)" stroke="#F6F6F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                             ) : (
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="0.5" y="0.5" width="27" height="27" rx="4.5" fill="#F6F6F6" stroke="#CDCDCD"/></svg>
                             )}
                        </div>
                        <div className="content-pref-text">🖥️ 영상</div>
                    </div>
                    
                    {/* Text Option */}
                    <div 
                        className="content-pref-card" 
                        onClick={() => toggleContentType('text')}
                        style={{background: selectedContentTypes.includes('text') ? '#E5E5E5' : '#F6F6F6'}}
                    >
                        <div className="content-pref-checkbox">
                             {selectedContentTypes.includes('text') ? (
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="0.5" y="0.5" width="27" height="27" rx="4.5" fill="#C1C1C1" stroke="#CDCDCD"/><path d="M14.1667 4.25L6.375 12.0417L2.83333 8.5" transform="translate(5 5)" stroke="#F6F6F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                             ) : (
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="0.5" y="0.5" width="27" height="27" rx="4.5" fill="#F6F6F6" stroke="#CDCDCD"/></svg>
                             )}
                        </div>
                        <div className="content-pref-text">📄 텍스트</div>
                    </div>
                    
                    {/* Audio Option */}
                    <div 
                        className="content-pref-card" 
                        onClick={() => toggleContentType('audio')}
                        style={{background: selectedContentTypes.includes('audio') ? '#E5E5E5' : '#F6F6F6'}}
                    >
                        <div className="content-pref-checkbox">
                             {selectedContentTypes.includes('audio') ? (
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="0.5" y="0.5" width="27" height="27" rx="4.5" fill="#C1C1C1" stroke="#CDCDCD"/><path d="M14.1667 4.25L6.375 12.0417L2.83333 8.5" transform="translate(5 5)" stroke="#F6F6F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                             ) : (
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="0.5" y="0.5" width="27" height="27" rx="4.5" fill="#F6F6F6" stroke="#CDCDCD"/></svg>
                             )}
                        </div>
                        <div className="content-pref-text">🎧 음성</div>
                    </div>
                </div>

                <div className="content-pref-other-link" onClick={() => setShowOtherTypeModal(true)}>
                    다른 유형도 보고싶어요
                </div>

                <div className="content-pref-complete-btn active" onClick={() => setView('main')}>
                    <div className="content-pref-btn-text">완료</div>
                </div>

                {/* Other Type Opinion Modal */}
                {showOtherTypeModal && (
                    <div className="modal-overlay">
                        <div className="other-type-modal-card">
                            <div className="other-type-modal-title">다른 유형 의견 남기기</div>
                            <div className="other-type-modal-desc">
                                더 보고 싶은 콘텐츠 유형이 있으신가요?<br/>
                                자유롭게 의견을 남겨주세요.
                            </div>
                            <textarea 
                                className="other-type-input-area" 
                                placeholder="여기에 내용을 입력해주세요."
                                value={otherTypeOpinion}
                                onChange={(e) => setOtherTypeOpinion(e.target.value)}
                            />
                            <div className="other-type-btn-row">
                                <div className="other-type-btn cancel" onClick={() => setShowOtherTypeModal(false)}>취소</div>
                                <div className="other-type-btn submit" onClick={handleOtherTypeSubmit}>제출하기</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Other Type Complete Modal */}
                {showOtherTypeCompleteModal && (
                    <div className="modal-overlay">
                        <div className="other-type-modal-card">
                             <div className="other-complete-icon">
                                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                             </div>
                            <div className="other-type-modal-title">제출 완료!</div>
                            <div className="other-type-modal-desc">
                                소중한 의견 감사합니다.<br/>
                                서비스 개선에 참고하겠습니다.
                            </div>
                            <div className="other-type-btn-row">
                                <div className="other-type-btn submit" onClick={() => setShowOtherTypeCompleteModal(false)}>확인</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    /* ================== Render: Saved Views ================== */
    if (view === 'saved') {
        const filteredContents = savedContentFilter === 'all' 
            ? savedContents 
            : savedContents.filter(c => c.type === savedContentFilter);

        return (
            <div className="profile-container" onClick={() => setIsSavedFilterOpen(false)}>
                 <div className="edit-back-arrow" onClick={() => setView('main')} style={{top:'55px'}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className="saved-header-title">저장</div>

                <div className="saved-tab-container">
                    <div 
                        className={`saved-tab ${savedTab === 'posts' ? 'active' : ''}`}
                        onClick={() => setSavedTab('posts')}
                    >
                        게시글
                        {savedTab === 'posts' ? <div className="saved-tab-indicator"></div> : <div className="saved-tab-indicator-inactive"></div>}
                    </div>
                    <div 
                        className={`saved-tab ${savedTab === 'content' ? 'active' : ''}`}
                        onClick={() => setSavedTab('content')}
                    >
                        콘텐츠
                        {savedTab === 'content' ? <div className="saved-tab-indicator"></div> : <div className="saved-tab-indicator-inactive"></div>}
                    </div>
                </div>

                {/* Filters */}
                {savedTab === 'posts' ? (
                     <div className="saved-filter-line">
                        <div className="saved-filter-btn">전체</div>
                        <div className="saved-filter-btn">최신순</div>
                     </div>
                ) : (
                    <div className="saved-filter-line">
                        <div className="saved-filter-btn" onClick={(e) => { e.stopPropagation(); setIsSavedFilterOpen(!isSavedFilterOpen); }}>
                            {savedContentFilter === 'all' ? '전체' :
                             savedContentFilter === 'text' ? '텍스트' :
                             savedContentFilter === 'video' ? '영상' : '음성'}
                            {isSavedFilterOpen && (
                                <div className="saved-filter-dropdown">
                                    <div className="saved-filter-option" onClick={() => setSavedContentFilter('all')}>전체</div>
                                    <div className="saved-filter-option" onClick={() => setSavedContentFilter('text')}>텍스트</div>
                                    <div className="saved-filter-option" onClick={() => setSavedContentFilter('video')}>영상</div>
                                    <div className="saved-filter-option" onClick={() => setSavedContentFilter('audio')}>음성</div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* List */}
                <div className="saved-list-container">
                    {savedTab === 'posts' ? (
                         savedPosts.length > 0 ? (
                            savedPosts.map(post => (
                                <div key={post.id} className="saved-card" onClick={() => handleSavedItemClick(post, 'post')}>
                                    <div className="saved-card-cat-badge">{post.category}</div>
                                    <div className="saved-card-title">{post.title}</div>
                                    <div className="saved-card-content">{post.content}</div>
                                    
                                    <div className="saved-card-footer">
                                         <div className="saved-stat">
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M12.0833 2.25C14.725 2.25 16.5 4.76438 16.5 7.11C16.5 11.8603 9.13333 15.75 9 15.75C8.86667 15.75 1.5 11.8603 1.5 7.11C1.5 4.76438 3.275 2.25 5.91667 2.25C7.43333 2.25 8.425 3.01781 9 3.69281C9.575 3.01781 10.5667 2.25 12.0833 2.25Z" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                            {post.likeCount}
                                         </div>
                                         <div className="saved-stat">
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                            {post.commentCount}
                                         </div>
                                         <div className="saved-stat">
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M12.0833 2.25C14.725 2.25 16.5 4.76438 16.5 7.11C16.5 11.8603 9.13333 15.75 9 15.75C8.86667 15.75 1.5 11.8603 1.5 7.11C1.5 4.76438 3.275 2.25 5.91667 2.25C7.43333 2.25 8.425 3.01781 9 3.69281C9.575 3.01781 10.5667 2.25 12.0833 2.25Z" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                            {post.viewCount}
                                         </div>
                                    </div>
                                    {/* Unsave Icon */}
                                    <div style={{position:'absolute', right:'16px', bottom:'14px'}} onClick={(e) => handleUnsave(e, post.id, 'post')}>
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><path d="M13.3733 14.1389L8.44625 10.7724L3.51923 14.1389V3.36613C3.51923 3.00899 3.66754 2.66647 3.93154 2.41394C4.19554 2.1614 4.5536 2.01953 4.92695 2.01953H11.9656C12.3389 2.01953 12.697 2.1614 12.961 2.41394C13.225 2.66647 13.3733 3.00899 13.3733 3.36613V14.1389Z" fill="#959595" stroke="#959595" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </div>
                                </div>
                            ))
                         ) : (
                             <div className="saved-empty-text">저장된 게시글이 없습니다.</div>
                         )
                    ) : (
                        filteredContents.length > 0 ? (
                            filteredContents.map(content => (
                                <div key={content.id} className="saved-card" onClick={() => handleSavedItemClick(content, 'content')}>
                                    <div className="saved-card-cat-badge">{content.category}</div>
                                    <div className="saved-card-title">{content.title}</div>
                                    <div className="saved-card-content">{content.content}</div>
                                    
                                     {/* Unsave Icon */}
                                    <div style={{position:'absolute', right:'16px', bottom:'14px'}} onClick={(e) => handleUnsave(e, content.id, 'content')}>
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><path d="M13.3733 14.1389L8.44625 10.7724L3.51923 14.1389V3.36613C3.51923 3.00899 3.66754 2.66647 3.93154 2.41394C4.19554 2.1614 4.5536 2.01953 4.92695 2.01953H11.9656C12.3389 2.01953 12.697 2.1614 12.961 2.41394C13.225 2.66647 13.3733 3.00899 13.3733 3.36613V14.1389Z" fill="#959595" stroke="#959595" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="saved-empty-text">저장된 콘텐츠가 없습니다.</div>
                        )
                    )}
                </div>
            </div>
        );
    }

    /* ================== Render: Saved Detail Views ================== */
    if ((view === 'savedPostDetail' || view === 'savedContentDetail') && selectedSavedItem) {
        return (
            <div className="profile-container">
                 <div className="edit-back-arrow" onClick={() => setView('saved')} style={{top:'55px'}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div style={{position:'absolute', top:'55px', left:'111px', fontSize:'16px', fontWeight:'600'}}>
                    {view === 'savedPostDetail' ? '게시글' : '카테고리'}
                </div>

                {/* Detail Content */}
                <div style={{position:'absolute', top:'100px', left:'0', width:'100%', padding:'0 34px'}}>
                    <div style={{fontSize:'20px', fontWeight:'600', marginBottom:'15px'}}>{selectedSavedItem.title}</div>
                    
                    {/* Category Badge if needed */}
                     <div style={{display: 'inline-flex', padding: '2px 8px', background: '#D6D3D1', borderRadius: '20px', fontSize: '10px', fontWeight: '600', color: 'black', marginBottom:'10px'}}>
                        {selectedSavedItem.category}
                     </div>

                    <div style={{fontSize:'12px', fontWeight:'600', color:'#A3A3A3', marginBottom:'30px'}}>
                        {selectedSavedItem.time}
                    </div>

                    <div style={{fontSize:'16px', fontWeight:'600', lineHeight:'1.5', marginBottom:'40px'}}>
                        {selectedSavedItem.content}
                    </div>

                    {/* Stats */}
                     <div style={{display:'flex', gap:'20px', alignItems:'center'}}>
                        <div style={{display:'flex', gap:'5px', fontSize:'16px', color:'#A3A3A3'}}>
                            좋아요 {selectedSavedItem.likeCount}
                        </div>
                         <div style={{display:'flex', gap:'5px', fontSize:'16px', color:'#A3A3A3'}}>
                            댓글 {selectedSavedItem.commentCount}
                        </div>
                         <div style={{display:'flex', gap:'5px', fontSize:'16px', color:'#A3A3A3'}}>
                            저장
                        </div>
                     </div>
                </div>

                {/* Saved Icon Active */}
                <div style={{position:'absolute', top:'61px', right:'22px'}} onClick={(e) => handleUnsave(e, selectedSavedItem.id, view === 'savedPostDetail' ? 'post' : 'content')}>
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>

                {/* Comment Bar */}
                <div style={{position:'absolute', bottom:'20px', left:'13px', width:'360px', height:'56px', background:'white', borderRadius:'30px', border:'1px solid #D6D3D1', display:'flex', alignItems:'center', padding:'0 20px'}}>
                     <div style={{fontSize:'12px', fontWeight:'600', color:'#D6D3D1'}}>댓글을 달아주세요</div>
                </div>
            </div>
        );
    }
 
    /* ================== Render: My Posts / Comments List ================== */
    if (view === 'myPosts') {

        return (
            <div className="profile-container" onClick={() => setOpenMenuId(null)}>
                <div className="edit-header-title">내가 쓴 글</div>
                <div className="edit-back-arrow" onClick={() => setView('main')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                {/* Tabs */}
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

                {/* Filters */}
                <div className="mypost-filter-line">
                    <div className="mypost-filter-btn">전체</div>
                    <div className="mypost-filter-btn" style={{left:'325px', position:'absolute'}}>최신순</div>
                </div>

                {/* List Content */}
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
                    // Comments List
                    <div className="mypost-comment-list-container">
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
                                <div className="comment-arrow-icon" onClick={() => handleCommentEdit(comment)}>
                                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10.3071 1.91992C12.5604 1.91992 14.0745 4.06468 14.0745 6.0655C14.0745 10.1175 7.79071 13.4354 7.67697 13.4354C7.56324 13.4354 1.27948 10.1175 1.27948 6.0655C1.27948 4.06468 2.79355 1.91992 5.04689 1.91992C6.34061 1.91992 7.1865 2.57487 7.67697 3.15064C8.16745 2.57487 9.01334 1.91992 10.3071 1.91992Z" stroke="#959595" strokeWidth="1.706" strokeLinecap="round" strokeLinejoin="round"/></svg>
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

    /* ================== Render: My Post Edit/Detail ================== */
    if (view === 'myPostEdit') {
        return (
            <div className="profile-container">
                <div className="editpost-header-left" onClick={() => setView('myPosts')}>취소</div>
                <div className="editpost-header-title">수정하기</div>
                <div className="editpost-header-right" onClick={() => setView('myPosts')}>완료</div>

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

                {/* Comment Bar Placeholder */}
                <div className="editpost-comment-bar">
                    <span style={{fontSize:'12px', fontWeight:'600', color:'#D6D3D1'}}>댓글을 달아주세요</span>
                </div>
            </div>
        );
    }


    /* ================== Render: Profile Main ================== */
    return (
        <div className="profile-container">
            {/* User Name */}
            <div className="profile-greeting">00님</div>

            {/* Settings Icon */}
            <div className="settings-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#656565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.7273 14.7273C18.6063 15.0015 18.5702 15.3056 18.6236 15.6005C18.6771 15.8954 18.8177 16.1676 19.0273 16.3818L19.0818 16.4364C19.2509 16.6052 19.385 16.8057 19.4765 17.0265C19.568 17.2472 19.6151 17.4838 19.6151 17.7227C19.6151 17.9617 19.568 18.1983 19.4765 18.419C19.385 18.6397 19.2509 18.8402 19.0818 19.0091C18.913 19.1781 18.7124 19.3122 18.4917 19.4037C18.271 19.4952 18.0344 19.5423 17.7955 19.5423C17.5565 19.5423 17.3199 19.4952 17.0992 19.4037C16.8785 19.3122 16.678 19.1781 16.5091 19.0091L16.4545 18.9545C16.2403 18.745 15.9682 18.6044 15.6733 18.5509C15.3784 18.4974 15.0742 18.5335 14.8 18.6545C14.5311 18.7698 14.3018 18.9611 14.1403 19.205C13.9788 19.4489 13.8921 19.7347 13.8909 20.0273V20.1818C13.8909 20.664 13.6994 21.1265 13.3584 21.4675C13.0174 21.8084 12.5549 22 12.0727 22C11.5905 22 11.1281 21.8084 10.7871 21.4675C10.4461 21.1265 10.2545 20.664 10.2545 20.1818V20.1C10.2475 19.7991 10.1501 19.5073 9.97501 19.2625C9.79991 19.0176 9.55521 18.8312 9.27273 18.7273C8.99853 18.6063 8.69437 18.5702 8.39947 18.6236C8.10456 18.6771 7.83244 18.8177 7.61818 19.0273L7.56364 19.0818C7.39478 19.2509 7.19425 19.385 6.97353 19.4765C6.7528 19.568 6.51621 19.6151 6.27727 19.6151C6.03834 19.6151 5.80174 19.568 5.58102 19.4765C5.36029 19.385 5.15977 19.2509 4.99091 19.0818C4.82186 18.913 4.68775 18.7124 4.59626 18.4917C4.50476 18.271 4.45766 18.0344 4.45766 17.7955C4.45766 17.5565 4.50476 17.3199 4.59626 17.0992C4.68775 16.8785 4.82186 16.678 4.99091 16.5091L5.04545 16.4545C5.25503 16.2403 5.39562 15.9682 5.4491 15.6733C5.50257 15.3784 5.46647 15.0742 5.34545 14.8C5.23022 14.5311 5.03887 14.3018 4.79497 14.1403C4.55107 13.9788 4.26526 13.8921 3.97273 13.8909H3.81818C3.33597 13.8909 2.87351 13.6994 2.53253 13.3584C2.19156 13.0174 2 12.5549 2 12.0727C2 11.5905 2.19156 11.1281 2.53253 10.7871C2.87351 10.4461 3.33597 10.2545 3.81818 10.2545H3.9C4.2009 10.2475 4.49273 10.1501 4.73754 9.97501C4.98236 9.79991 5.16883 9.55521 5.27273 9.27273C5.39374 8.99853 5.42984 8.69437 5.37637 8.39947C5.3229 8.10456 5.18231 7.83244 4.97273 7.61818L4.91818 7.56364C4.74913 7.39478 4.61503 7.19425 4.52353 6.97353C4.43203 6.7528 4.38493 6.51621 4.38493 6.27727C4.38493 6.03834 4.43203 5.80174 4.52353 5.58102C4.61503 5.36029 4.74913 5.15977 4.91818 4.99091C5.08704 4.82186 5.28757 4.68775 5.50829 4.59626C5.72901 4.50476 5.96561 4.45766 6.20455 4.45766C6.44348 4.45766 6.68008 4.50476 6.9008 4.59626C7.12152 4.68775 7.32205 4.82186 7.49091 4.99091L7.54545 5.04545C7.75971 5.25503 8.03183 5.39562 8.32674 5.4491C8.62164 5.50257 8.9258 5.46647 9.2 5.34545H9.27273C9.54161 5.23022 9.77093 5.03887 9.93245 4.79497C10.094 4.55107 10.1807 4.26526 10.1818 3.97273V3.81818C10.1818 3.33597 10.3734 2.87351 10.7144 2.53253C11.0553 2.19156 11.5178 2 12 2C12.4822 2 12.9447 2.19156 13.2856 2.53253C13.6266 2.87351 13.8182 3.33597 13.8182 3.81818V3.9C13.8193 4.19253 13.906 4.47834 14.0676 4.72224C14.2291 4.96614 14.4584 5.15749 14.7273 5.27273C15.0015 5.39374 15.3056 5.42984 15.6005 5.37637C15.8954 5.3229 16.1676 5.18231 16.3818 4.97273L16.4364 4.91818C16.6052 4.74913 16.8057 4.61503 17.0265 4.52353C17.2472 4.43203 17.4838 4.38493 17.7227 4.38493C17.9617 4.38493 18.1983 4.43203 18.419 4.52353C18.6397 4.61503 18.8402 4.74913 19.0091 4.91818C19.1781 5.08704 19.3122 5.28757 19.4037 5.50829C19.4952 5.72901 19.5423 5.96561 19.5423 6.20455C19.5423 6.44348 19.4952 6.68008 19.4037 6.9008C19.3122 7.12152 19.1781 7.32205 19.0091 7.49091L18.9545 7.54545C18.745 7.75971 18.6044 8.03183 18.5509 8.32674C18.4974 8.62164 18.5335 8.9258 18.6545 9.2V9.27273C18.7698 9.54161 18.9611 9.77093 19.205 9.93245C19.4489 10.094 19.7347 10.1807 20.0273 10.1818H20.1818C20.664 10.1818 21.1265 10.3734 21.4675 10.7144C21.8084 11.0553 22 11.5178 22 12C22 12.4822 21.8084 12.9447 21.4675 13.2856C21.1265 13.6266 20.664 13.8182 20.1818 13.8182H20.1C19.8075 13.8193 19.5217 13.906 19.2778 14.0676C19.0339 14.2291 18.8425 14.4584 18.7273 14.7273Z" stroke="#656565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            {/* Profile Info Card */}
            <div className="info-card" onClick={() => setView('edit')}>
                <div className="card-title">프로필 정보</div>
                <div className="info-details">
                    {formData.year ? formData.year : ''}<br/>
                    {formData.job ? formData.job : ''}<br/>
                    {formData.industry ? formData.industry : ''}
                </div>
                <div className="edit-text-btn">수정하기</div>
                <div className="edit-arrow-icon">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="#DADADA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>

            {/* Grid Cards */}
            {/* Grid Cards */}
            <div className="grid-card card-mypost" onClick={() => setView('myPosts')}>
                <div className="grid-card-title">내가 쓴 글</div>
                <div className="more-text-btn">자세히 보기</div>
                <div className="more-arrow-icon">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="#DADADA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>

            <div className="grid-card card-content" onClick={() => setView('contentPreference')}>
                <div className="grid-card-title">콘텐츠</div>
                <div className="more-text-btn">자세히 보기</div>
                <div className="more-arrow-icon">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="#DADADA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>

            <div className="grid-card card-like">
                <div className="grid-card-title">좋아요</div>
                <div className="more-text-btn">자세히 보기</div>
                <div className="more-arrow-icon">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="#DADADA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>

            <div className="grid-card card-save" onClick={() => setView('saved')}>
                <div className="grid-card-title">저장</div>
                <div className="more-text-btn">자세히 보기</div>
                <div className="more-arrow-icon">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="#DADADA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}
