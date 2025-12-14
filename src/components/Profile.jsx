import React, { useState } from 'react';
import './profile.css';
import { ProfileEdit } from './ProfileEdit';
import { ProfileMyActivity } from './ProfileMyActivity';
import { ProfileContent } from './ProfileContent';
import { ProfileLiked } from './ProfileLiked';
import { ProfileSaved } from './ProfileSaved';
import { ProfileSettings } from './ProfileSettings';

export function Profile({ onNavigate }) {
    const [view, setView] = useState('main'); // 'main' | 'edit' | 'myPosts' | 'contentPreference' | 'liked' | 'saved' | 'settings'
    
    // Main View Data (Using dummy data for now, ideally fetched or passed)
    const [formData, setFormData] = useState({
        name: '이소민',
        job: '대리',
        year: '3년차',
        industry: '마케팅'
    });

    if (view === 'edit') return <ProfileEdit onBack={() => setView('main')} />;
    if (view === 'myPosts') return <ProfileMyActivity onBack={() => setView('main')} />;
    if (view === 'contentPreference') return <ProfileContent onBack={() => setView('main')} />;
    if (view === 'liked') return <ProfileLiked onBack={() => setView('main')} />;
    if (view === 'saved') return <ProfileSaved onBack={() => setView('main')} />;
    if (view === 'settings') return <ProfileSettings onBack={() => setView('main')} />;

    /* ================== Render: Profile Main ================== */
    return (
        <div className="profile-container">
            {/* User Name */}
            <div className="profile-greeting">{formData.name}님</div>

            {/* Settings Icon */}
            <div className="settings-icon" onClick={() => setView('settings')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0002 15.5C13.9332 15.5 15.5002 13.933 15.5002 12C15.5002 10.067 13.9332 8.5 12.0002 8.5C10.0672 8.5 8.50024 10.067 8.50024 12C8.50024 13.933 10.0672 15.5 12.0002 15.5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19.4 15C19.6366 14.5442 19.9822 14.1643 20.4079 13.8924C20.8336 13.6205 21.3263 13.4646 21.8443 13.4377C21.8967 13.4357 21.949 13.4299 22.0007 13.4206L22.0911 12.9157C22.1158 12.7782 22.1281 12.6391 22.1281 12C22.1281 11.3609 22.1158 11.2217 22.0911 11.0843L22.0007 10.5794C21.949 10.5701 21.8967 10.5642 21.8443 10.5623C21.3263 10.5353 20.8336 10.3794 20.4079 10.1076C19.9822 9.83569 19.6366 9.45571 19.4 8.99997C19.2319 8.67926 19.1444 8.32684 19.1444 7.9696C19.1444 7.61235 19.2319 7.25994 19.4 6.93922L19.4925 6.46788C19.4526 6.34005 19.4074 6.21366 19.3571 6.08906L19.006 5.21639C18.966 5.11674 18.9224 5.01825 18.8754 4.9211C18.5771 4.30155 18.156 3.75053 17.6385 3.30312C17.121 2.8557 16.5181 2.52157 15.8679 2.32185C15.3675 2.16912 14.8354 2.1388 14.3216 2.23377L13.8242 2.32567C13.6826 2.35183 13.5385 2.36502 13.394 2.36502C12.875 2.36502 12.3667 2.21325 11.9365 1.92985C11.5063 1.64644 11.1746 1.24479 10.9856 0.77884L10.7937 0.306024C10.6728 0.23961 10.548 0.177699 10.4194 0.120612L9.51908 1.94726C9.41626 1.90159 9.31174 1.86153 9.20572 1.82736C8.53326 1.60959 7.81057 1.56455 7.11322 1.69695C6.41586 1.82936 5.76951 2.13437 5.24151 2.58046C4.71352 3.02656 4.3232 3.59737 4.11145 4.23351C3.94851 4.72314 3.91617 5.23933 4.01755 5.7324L4.11581 6.20817C4.14321 6.34091 4.1571 6.47605 4.1571 6.61159C4.1571 7.13529 4.00416 7.64795 3.71836 8.08207C3.43256 8.51619 3.02758 8.85108 2.55767 9.04166L2.08051 9.23518C2.01353 9.35624 1.95109 9.48008 1.89354 9.60655L1.5173 10.4331C1.47432 10.5276 1.43673 10.6234 1.40474 10.7204C1.20176 11.3734 1.15783 12.0673 1.27756 12.7381C1.3973 13.4089 1.67694 14.0351 2.08992 14.5583C2.40767 14.961 2.80802 15.2951 3.26787 15.5414C3.71261 15.7533 4.18434 15.8643 4.65866 15.8643C4.8028 15.8643 4.94676 15.8504 5.08945 15.8225L5.56845 15.7291C6.06456 15.6325 6.57724 15.6793 7.04279 15.8633C7.50833 16.0474 7.90623 16.3607 8.18667 16.7645L8.47146 17.1747C8.53982 17.2941 8.60197 17.4165 8.65768 17.5418L9.02102 18.3582C9.06253 18.4514 9.09882 18.5457 9.12971 18.641C9.32559 19.2706 9.36709 19.9392 9.24996 20.5855C9.13283 21.2319 8.86088 21.8349 8.46011 22.3385C7.94056 22.9912 7.23419 23.4682 6.42589 23.6841L12.0002 23.6841C12.0002 23.6841 23 23.6841 23 12C23 6.47715 18.5228 2 13 2L13.8242 2.32567" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

            <div className="grid-card card-like" onClick={() => setView('liked')}>
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
