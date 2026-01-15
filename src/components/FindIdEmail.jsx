import React, { useState } from "react";
import "../styles/onboarding/find-id.css";

export function FindIdEmail({ onNext, onBack }) {
  const [email, setEmail] = useState("");

  return (
    <div className="find-id-container">
      {/* Header */}
      <div className="find-id-header">
        <div className="find-id-back-btn" onClick={onBack}>
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
        <div className="find-id-title">아이디 찾기</div>
      </div>

      {/* Tabs */}
      <div className="find-id-tabs">
        <div className="find-id-tab tab-active">
          <div className="find-id-tab-text">아이디</div>
          <div className="find-id-tab-indicator"></div>
        </div>
        <div className="find-id-tab tab-inactive">
          <div className="find-id-tab-text">비밀번호</div>
          <div className="find-id-tab-indicator"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="find-id-main-title">
        아이디를 찾기 위해
        <br />
        이메일을 인증해주세요
      </div>

      <div className="find-id-label" style={{ top: "275px" }}>
        이메일
      </div>

      <div className="find-id-input-container" style={{ top: "298px" }}>
        <input
          type="email"
          className="find-id-input"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div
        className="find-id-action-btn btn-white"
        style={{ top: "298px" }}
        onClick={onNext}
      >
        <div>인증번호</div>
      </div>
    </div>
  );
}
