import React from "react";
import "../styles/mypage/profile-account.css"; 

export function ProfileAccount({ onBack, onNavigate }) {
  return (
    <div className="account-mgmt-container">
      <header className="account-mgmt-header">
        <button className="back-button" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="header-title">계정관리</h1>
      </header>

      <nav className="account-mgmt-nav">
        <div 
          className="menu-item" 
          onClick={() => onNavigate && onNavigate("change-password")}
        >
          <span>비밀번호 변경</span>
        </div>
        
        <div 
          className="menu-item" 
          onClick={() => onNavigate && onNavigate("withdrawal")}
        >
          <span>회원 탈퇴</span>
        </div>
      </nav>
    </div>
  );
}