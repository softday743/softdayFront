import React from "react";
import "../styles/onboarding/find-id.css";

export function FindPwComplete({ onLogin, onTabId }) {
  return (
    <div className="find-id-container">
      {/* Header */}
      <div className="find-id-header">
        {/* No back button usually on success, or maybe back to Login? */}
        <div className="find-id-back-btn" onClick={onLogin}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="find-id-title">비밀번호 찾기</div>
      </div>

      {/* Tabs */}
      <div className="find-id-tabs">
        <div className="find-id-tab tab-inactive">
          <div className="find-id-tab-text">아이디</div>
          <div className="find-id-tab-indicator"></div>
        </div>
        <div className="find-id-tab tab-active">
          <div className="find-id-tab-text">비밀번호</div>
          <div className="find-id-tab-indicator"></div>
        </div>
      </div>

      <div className="password-reset-success-text">
        비밀번호가 재설정 되었어요
        <br />
        로그인해주세요
      </div>

      <div className="login-link" onClick={onLogin}>
        로그인하러 가기
      </div>
    </div>
  );
}
