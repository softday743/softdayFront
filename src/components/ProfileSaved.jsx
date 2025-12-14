import React, { useState } from 'react';
import './profile.css';

export function ProfileSaved({ onBack }) {
    const [savedTab, setSavedTab] = useState('posts'); // 'posts' | 'content'
    const [savedFilter, setSavedFilter] = useState('all'); // 'all' | 'latest'
    const [savedContentFilter, setSavedContentFilter] = useState('all'); // 'all' | 'text' | 'video' | 'audio'
    const [isSavedFilterOpen, setIsSavedFilterOpen] = useState(false);
    
    // Dummy Data for Saved Items
    const [savedPosts, setSavedPosts] = useState([
        { id: 101, title: '내용', content: '내용이 들어갑니다...', category: '카테고리', time: '10분 전', likeCount: 5, commentCount: 2, viewCount: 24, author:'작성자' },
        { id: 102, title: '다른 내용', content: '또 다른 내용...', category: '카테고리', time: '1시간 전', likeCount: 10, commentCount: 5, viewCount: 100, author:'작성자' },
        { id: 103, title: '세번째 내용', content: '세번째 내용...', category: '카테고리', time: '2시간 전', likeCount: 0, commentCount: 0, viewCount: 1, author:'작성자' }
    ]);

    const [savedContents, setSavedContents] = useState([
        { id: 201, title: '내용', content: '콘텐츠 내용...', category: '카테고리', type: 'text', time: '5분 전', likeCount: 5, commentCount: 2, viewCount: 24 },
        { id: 202, title: '영상 콘텐츠', content: '영상...', category: '카테고리', type: 'video', time: '15분 전', likeCount: 20, commentCount: 10, viewCount: 300 },
        { id: 203, title: '음성 콘텐츠', content: '음성...', category: '카테고리', type: 'audio', time: '1일 전', likeCount: 3, commentCount: 1, viewCount: 50 },
    ]);

    const [selectedSavedItem, setSelectedSavedItem] = useState(null);
    const [view, setView] = useState('list'); // 'list' | 'postDetail' | 'contentDetail'

    const handleSavedItemClick = (item, type) => {
        setSelectedSavedItem(item);
        if (type === 'post') setView('postDetail');
        else setView('contentDetail');
    };

    const handleUnsave = (e, id, type) => {
        e.stopPropagation();
        if (type === 'post') {
            setSavedPosts(prev => prev.filter(p => p.id !== id));
        } else {
            setSavedContents(prev => prev.filter(c => c.id !== id));
        }
        if (view !== 'list') setView('list'); // Go back to list if unsaving from detail
    };

    const filteredContents = savedContentFilter === 'all' 
        ? savedContents 
        : savedContents.filter(c => c.type === savedContentFilter);

    if (view === 'postDetail' || view === 'contentDetail') {
         if (!selectedSavedItem) return null;
         return (
            <div className="profile-container">
                 <div className="edit-back-arrow" onClick={() => setView('list')} style={{top:'55px'}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div style={{position:'absolute', top:'55px', left:'111px', fontSize:'16px', fontWeight:'600'}}>
                    {view === 'postDetail' ? '게시글' : '카테고리'}
                </div>

                {/* Detail Content */}
                <div style={{position:'absolute', top:'100px', left:'0', width:'100%', padding:'0 34px'}}>
                    <div style={{fontSize:'20px', fontWeight:'600', marginBottom:'15px'}}>{selectedSavedItem.title}</div>
                    
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
                <div style={{position:'absolute', top:'61px', right:'22px'}} onClick={(e) => handleUnsave(e, selectedSavedItem.id, view === 'postDetail' ? 'post' : 'content')}>
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>

                {/* Comment Bar */}
                <div style={{position:'absolute', bottom:'20px', left:'13px', width:'360px', height:'56px', background:'white', borderRadius:'30px', border:'1px solid #D6D3D1', display:'flex', alignItems:'center', padding:'0 20px'}}>
                     <div style={{fontSize:'12px', fontWeight:'600', color:'#D6D3D1'}}>댓글을 달아주세요</div>
                </div>
            </div>
         );
    }

    return (
        <div className="profile-container" onClick={() => setIsSavedFilterOpen(false)}>
             <div className="edit-back-arrow" onClick={onBack} style={{top:'55px'}}>
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
