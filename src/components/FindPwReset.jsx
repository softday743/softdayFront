import React, { useState } from "react";
import { Eye } from "./Eye";
import { EyeOff } from "./EyeOff";
import "./find-id.css";

export function FindPwReset({ onNext, onBack, onTabId }) {
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

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

      {/* Main Content */}
      <div className="find-id-main-title">비밀번호를 재설정해주세요.</div>

      {/* Password Input 1 */}
      <div className="find-id-input-container-pw" style={{ top: "277px" }}>
        <input
          type={showPassword1 ? "text" : "password"}
          className="find-id-input"
          placeholder="비밀번호"
          value={pw1}
          onChange={(e) => setPw1(e.target.value)}
        />
        <div
          className="find-id-input-icon"
          onClick={() => setShowPassword1(!showPassword1)}
          style={{ cursor: "pointer" }}
        >
          {showPassword1 ? <Eye /> : <EyeOff />}
        </div>
      </div>

      {/* Visual indicators for password strength? Mockup has many dots. Skipping for simplicity or just basic inputs for now. */}

      {/* Password Input 2 */}
      <div className="find-id-input-container-pw" style={{ top: "347px" }}>
        <input
          type={showPassword2 ? "text" : "password"}
          className="find-id-input"
          placeholder="비밀번호 확인"
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
        />
        <div
          className="find-id-input-icon"
          onClick={() => setShowPassword2(!showPassword2)}
          style={{ cursor: "pointer" }}
        >
          {showPassword2 ? <Eye /> : <EyeOff />}
        </div>
      </div>

      <div className="change-btn" onClick={onNext}>
        <div className="change-btn-text">변경</div>
      </div>
    </div>
  );
}
