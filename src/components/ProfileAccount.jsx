import React from 'react';

export const ProfileAccount = ({ onBack, onNavigate }) => {
  return (
    <div className="settings-container">
      <header className="header">
        <img src={iconArrowLeft} onClick={onBack} alt="back" />
        <h1>계정 관리</h1>
      </header>
      <div className="settings-item" onClick={() => onNavigate('email')}>
        <span>이메일 변경</span>
      </div>
      <div className="settings-item" onClick={() => onNavigate('withdrawal')}>
        <span>회원 탈퇴</span>
      </div>
    </div>
  );
};