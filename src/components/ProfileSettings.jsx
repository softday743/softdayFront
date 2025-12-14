import React, { useState } from 'react';
import './profile.css';

export function ProfileSettings({ onBack }) {
    const [notificationSettings, setNotificationSettings] = useState({
        service: true,
        marketing: true,
        community: true,
        event: true,
        stats: true,
        chatbot: true
    });
    
    // Account Change States
    const [emailChange, setEmailChange] = useState({ email: '', authCode: '', step: 'request' }); // step: 'request' | 'verify' | 'complete'
    const [passwordChange, setPasswordChange] = useState({ id: '', email: '', authCode: '', step: 'request' }); // step: 'request' | 'verify'
    const [deleteAccount, setDeleteAccount] = useState({ 
        step: 'reason', // 'reason' | 'confirm' | 'complete'
        reason: '',
        password: '',
        isPasswordError: false 
    });

    const [view, setView] = useState('main'); // 'main' | 'notification' | 'account' ...

    const toggleNotification = (key) => {
        setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    if (view === 'notification') {
        return (
            <div className="profile-container">
                 <div className="edit-back-arrow" onClick={() => setView('main')} style={{top:'55px', zIndex:'50'}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className="settings-header-title">알림</div>

                <div className="settings-list-container" style={{top:'80px'}}>
                    <div className="settings-section-title">서비스 알림</div>
                    <div className="settings-toggle-item">
                        게시판 알림
                        <div onClick={() => toggleNotification('community')}>
                            {/* Toggle Switch */}
                            {notificationSettings.community ? (
                                <svg width="39" height="30" viewBox="0 0 39 30" fill="none"><rect width="39" height="30" fill="transparent"/><rect x="2" y="3" width="36" height="20" rx="10" fill="#34C759"/><circle cx="28" cy="13" r="8" fill="white"/></svg>
                            ) : (
                                <svg width="39" height="30" viewBox="0 0 39 30" fill="none"><rect width="39" height="30" fill="transparent"/><rect x="2" y="3" width="36" height="20" rx="10" fill="#E5E5E5"/><circle cx="12" cy="13" r="8" fill="white"/></svg>
                            )}
                        </div>
                    </div>
                     <div className="settings-toggle-item">
                        통계 알림
                        <div onClick={() => toggleNotification('stats')}>
                            {notificationSettings.stats ? (
                                <svg width="39" height="30" viewBox="0 0 39 30" fill="none"><rect width="39" height="30" fill="transparent"/><rect x="2" y="3" width="36" height="20" rx="10" fill="#34C759"/><circle cx="28" cy="13" r="8" fill="white"/></svg>
                            ) : (
                                <svg width="39" height="30" viewBox="0 0 39 30" fill="none"><rect width="39" height="30" fill="transparent"/><rect x="2" y="3" width="36" height="20" rx="10" fill="#E5E5E5"/><circle cx="12" cy="13" r="8" fill="white"/></svg>
                            )}
                        </div>
                    </div>
                     <div className="settings-toggle-item">
                        챗봇 알림
                        <div onClick={() => toggleNotification('chatbot')}>
                            {notificationSettings.chatbot ? (
                                <svg width="39" height="30" viewBox="0 0 39 30" fill="none"><rect width="39" height="30" fill="transparent"/><rect x="2" y="3" width="36" height="20" rx="10" fill="#34C759"/><circle cx="28" cy="13" r="8" fill="white"/></svg>
                            ) : (
                                <svg width="39" height="30" viewBox="0 0 39 30" fill="none"><rect width="39" height="30" fill="transparent"/><rect x="2" y="3" width="36" height="20" rx="10" fill="#E5E5E5"/><circle cx="12" cy="13" r="8" fill="white"/></svg>
                            )}
                        </div>
                    </div>
                    
                    <div className="settings-section-title">마케팅 알림</div>
                    <div className="settings-toggle-item">
                        이벤트/프로모션
                        <div onClick={() => toggleNotification('event')}>
                             {notificationSettings.event ? (
                                <svg width="39" height="30" viewBox="0 0 39 30" fill="none"><rect width="39" height="30" fill="transparent"/><rect x="2" y="3" width="36" height="20" rx="10" fill="#34C759"/><circle cx="28" cy="13" r="8" fill="white"/></svg>
                            ) : (
                                <svg width="39" height="30" viewBox="0 0 39 30" fill="none"><rect width="39" height="30" fill="transparent"/><rect x="2" y="3" width="36" height="20" rx="10" fill="#E5E5E5"/><circle cx="12" cy="13" r="8" fill="white"/></svg>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (view === 'account') {
        return (
             <div className="profile-container">
                 <div className="edit-back-arrow" onClick={() => setView('main')} style={{top:'55px', zIndex:'50'}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className="settings-header-title">계정관리</div>

                 <div className="settings-list-container">
                    <div className="settings-item" onClick={() => {/* Implement Email Change View */}}>
                        이메일 변경
                        <div style={{position:'absolute', right:'20px'}}>
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                    </div>
                    <div className="settings-item" onClick={() => {/* Implement Password Change View */}}>
                        비밀번호 변경
                         <div style={{position:'absolute', right:'20px'}}>
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                    </div>
                    <div className="settings-item" onClick={() => {/* Implement Delete Account View */}}>
                        회원 탈퇴
                         <div style={{position:'absolute', right:'20px'}}>
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                    </div>
                 </div>
            </div>
        );
    }

    // Main Settings View
    return (
        <div className="profile-container">
             <div className="edit-back-arrow" onClick={onBack} style={{top:'61px', zIndex:'50'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <div className="settings-header-title">설정</div>

            <div className="settings-item" style={{top: '115px'}} onClick={() => setView('notification')}>
                알림
            </div>
            <div className="settings-item" style={{top: '165px'}} onClick={() => setView('account')}>
                계정 관리
            </div>

            <div className="settings-divider" style={{top: '216px'}}></div>

            <div className="settings-item" style={{top: '224px'}}>
                개인정보 처리방침
            </div>
            <div className="settings-item" style={{top: '278px'}}>
                서비스 이용약관
            </div>
            <div className="settings-item" style={{top: '332px'}}>
                버전 정보
                 <div style={{position:'absolute', right:'24px', fontSize:'14px', color:'#A3A3A3'}}>
                     v.1.0.0
                </div>
            </div>

            <div className="settings-logout" style={{top: '393px'}}>로그아웃</div>
        </div>
    );
}
