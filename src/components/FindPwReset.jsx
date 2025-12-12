import React, { useState } from 'react';
import './find-id.css';

export function FindPwReset({ onNext, onBack, onTabId }) {
    const [pw1, setPw1] = useState('');
    const [pw2, setPw2] = useState('');

    return (
        <div className="find-id-container">
            {/* Header */}
            <div className="find-id-header">
                <div className="find-id-back-btn" onClick={onBack}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className="find-id-title">비밀번호 찾기</div>
            </div>

            {/* Tabs */}
            <div className="find-id-tabs">
                <div className="find-id-tab tab-inactive" onClick={onTabId}>
                    <div className="find-id-tab-text">아이디</div>
                    <div className="find-id-tab-indicator"></div>
                </div>
                <div className="find-id-tab tab-active">
                    <div className="find-id-tab-text">비밀번호</div>
                    <div className="find-id-tab-indicator"></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="find-id-main-title">비밀번호를 재설정해주세요.</div>

             {/* Password Input 1 */}
            <div className="find-id-input-container wide password" style={{ top: '277px' }}>
                <input 
                    type="password" 
                    className="find-id-input" 
                    placeholder="비밀번호" 
                    value={pw1}
                    onChange={(e) => setPw1(e.target.value)}
                />
                <div className="find-id-input-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.6819 3.96914 7.65661 6.06 6.06M9.9 4.24C10.5883 4.07888 11.2931 3.99834 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2047 20.84 15.19M14.12 14.12C13.8454 14.4147 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.481 9.80385 14.1962C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88M1 1L23 23" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
            
            {/* Visual indicators for password strength? Mockup has many dots. Skipping for simplicity or just basic inputs for now. */}

             {/* Password Input 2 */}
            <div className="find-id-input-container wide password" style={{ top: '347px' }}>
                <input 
                    type="password" 
                    className="find-id-input" 
                    placeholder="비밀번호 확인" 
                    value={pw2}
                    onChange={(e) => setPw2(e.target.value)}
                />
                 <div className="find-id-input-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.6819 3.96914 7.65661 6.06 6.06M9.9 4.24C10.5883 4.07888 11.2931 3.99834 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2047 20.84 15.19M14.12 14.12C13.8454 14.4147 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.481 9.80385 14.1962C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88M1 1L23 23" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>

            <div className="change-btn" onClick={onNext}>
                <div className="change-btn-text">변경</div>
            </div>
        </div>
    );
}
