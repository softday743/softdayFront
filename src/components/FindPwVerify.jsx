import React, { useState } from 'react';
import './find-id.css';

export function FindPwVerify({ onNext, onBack, onTabId, email = "0000@gmail.com", id = "아이디" }) {
    const [code, setCode] = useState('');

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
            <div className="find-id-main-title">비밀번호를 찾기 위해<br/>아이디와 이메일을 인증해주세요</div>

            {/* Readonly Inputs */}
            <div className="find-id-label" style={{ top: '275px' }}>아이디</div>
            <div className="find-id-input-container wide" style={{ top: '298px', background: 'white', border: '1px solid #d6d3d1' }}>
                <div className="find-id-input" style={{ display: 'flex', alignItems: 'center' }}>{id}</div>
            </div>

            <div className="find-id-label" style={{ top: '365px' }}>이메일</div>
            <div className="find-id-input-container" style={{ top: '388px', background: 'neutral-100', border: '1px solid #d6d3d1' }}>
                 <div className="find-id-input" style={{ display: 'flex', alignItems: 'center' }}>{email}</div>
            </div>
            <div className="find-id-action-btn btn-white" style={{ top: '388px' }}>
                <div>다시 받기</div>
            </div>

            {/* Verification Code */}
            <div className="find-id-label" style={{ top: '455px' }}>인증번호</div>
            <div className="find-id-input-container" style={{ top: '478px' }}>
                <input 
                    type="text" 
                    className="find-id-input" 
                    placeholder="인증번호를 입력해주세요" 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
            </div>
            <div className="find-id-action-btn btn-amber" style={{ top: '478px' }} onClick={onNext}>
                <div>인증확인</div>
            </div>
             <div className="timer-text" style={{ top: '541px' }}>남은 시간 2:59</div>
        </div>
    );
}
