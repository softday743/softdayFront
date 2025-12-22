import React, { useState } from 'react';
import './stress-checkin.css';

export function StressCheckIn({ onBack, onComplete }) {
    const [mood, setMood] = useState(null);
    const [selectedReasons, setSelectedReasons] = useState([]);
    const [otherReason, setOtherReason] = useState('');
    const [showStopPopup, setShowStopPopup] = useState(false);
    const [showCompleteToast, setShowCompleteToast] = useState(false);

    const moods = [
        { id: 'very_good', label: '매우 좋아요 😍', iconColor: '#FD9800' },
        { id: 'good', label: '좋아요 😊', iconColor: '#FD9800' },
        { id: 'normal', label: '보통이예요 😐', iconColor: '#FD9800' },
        { id: 'bad', label: '안 좋아요 😔', iconColor: '#FD9800' },
        { id: 'very_bad', label: '정말 안 좋아요😢', iconColor: '#FD9800' }
    ];

    const reasons = [
        '업무 과다', '인간관계', '성과 압박', '일-생활 균형', '기타'
    ];

    const handleBack = () => {
        if (mood || selectedReasons.length > 0) {
            setShowStopPopup(true);
        } else {
            onBack();
        }
    };

    const toggleReason = (reason) => {
        if (selectedReasons.includes(reason)) {
            setSelectedReasons(selectedReasons.filter(r => r !== reason));
        } else {
            setSelectedReasons([...selectedReasons, reason]);
        }
    };

    const handleComplete = () => {
        if (!mood) return; // Mood is required
        setShowCompleteToast(true);
        setTimeout(() => {
            setShowCompleteToast(false);
            onComplete(); // Navigate to result or home
        }, 1500);
    };

    const isCompleteEnabled = mood && (selectedReasons.length > 0 || otherReason.length > 0);

    return (
        <div className="start-checkin-container">
            {/* Header */}
            <div className="sc-back-arrow" onClick={handleBack}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <div className="sc-header-title">스트레스 체크인</div>

            {/* Question 1 */}
            <div className="sc-question-mood">💬 오늘 기분은 어떤가요?</div>
            <div className="sc-radio-group">
                {moods.map((m) => (
                    <div key={m.id} className="sc-radio-item" onClick={() => setMood(m.id)}>
                        <div className="sc-radio-icon">
                            {mood === m.id ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 17C13.3833 17 14.5625 16.5125 15.5375 15.5375C16.5125 14.5625 17 13.3833 17 12C17 10.6167 16.5125 9.4375 15.5375 8.4625C14.5625 7.4875 13.3833 7 12 7C10.6167 7 9.4375 7.4875 8.4625 8.4625C7.4875 9.4375 7 10.6167 7 12C7 13.3833 7.4875 14.5625 8.4625 15.5375C9.4375 16.5125 10.6167 17 12 17ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill={m.iconColor}/>
                                </svg>
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 17C13.3833 17 14.5625 16.5125 15.5375 15.5375C16.5125 14.5625 17 13.3833 17 12C17 10.6167 16.5125 9.4375 15.5375 8.4625C14.5625 7.4875 13.3833 7 12 7C10.6167 7 9.4375 7.4875 8.4625 8.4625C7.4875 9.4375 7 10.6167 7 12C7 13.3833 7.4875 14.5625 8.4625 15.5375C9.4375 16.5125 10.6167 17 12 17ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="#E6E6E6"/>
                                </svg>
                            )}
                        </div>
                        <div className="sc-radio-text">{m.label}</div>
                    </div>
                ))}
            </div>

            <div className="sc-divider"></div>

            {/* Question 2 - Visible or Active based on logic, but shown statically for now */}
            <div className="sc-question-reason">🤔 스트레스가 있다면 어떤 이유인가요?</div>
            <div className="sc-tags-container">
                {reasons.map((r) => (
                    <div 
                        key={r} 
                        className={`sc-tag ${selectedReasons.includes(r) ? 'selected' : ''} ${r === '기타' ? 'wide' : ''}`}
                        onClick={() => toggleReason(r)}
                    >
                        {r}
                    </div>
                ))}
            </div>

            {selectedReasons.includes('기타') && (
                <textarea 
                    className="sc-input-area" 
                    placeholder="이유를 입력해주세요."
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                />
            )}

            {/* Complete Button */}
            <div 
                className={`sc-complete-btn ${isCompleteEnabled ? 'active' : ''}`}
                onClick={isCompleteEnabled ? handleComplete : undefined}
                style={{ top: '703px' }} // Position as per user design Frame 14, 15
            >
                완료
            </div>

            {/* Stop Popup */}
            {showStopPopup && (
                <div className="sc-overlay">
                    <div className="sc-popup">
                        <div className="sc-popup-text">
                            아직 스트레스 체크인이<br/>
                            완료되지 않았어요!<br/>
                            끝까지 기록해보아요🫶
                        </div>
                        <div className="sc-popup-btn-group">
                            <div className="sc-popup-btn cancel" onClick={onBack}>그만하기</div>
                            <div className="sc-popup-btn confirm" onClick={() => setShowStopPopup(false)}>계속하기</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Complete Toast */}
            {showCompleteToast && (
                <div className="sc-toast">
                    ✅ 오늘 기분 저장 완료!
                </div>
            )}
        </div>
    );
}
