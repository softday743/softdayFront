import React, { useState } from 'react';
import './profile.css';

export function ProfileContent({ onBack }) {
    const [selectedContentTypes, setSelectedContentTypes] = useState(['text', 'audio']);
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

    return (
        <div className="profile-container">
            <div className="edit-back-arrow" onClick={onBack} style={{top:'55px'}}>
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

            <div className="content-pref-complete-btn active" onClick={onBack}>
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
