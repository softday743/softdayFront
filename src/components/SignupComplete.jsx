import React from "react";
import welcomeEmoji from "../assets/welcome-emoji.png";
import "./signup-complete.css";

export function SignupComplete({ onNext, userName = "사용자" }) {
  return (
    <div className="signup-complete-container" onClick={onNext}>
      <div className="progress-steps">
        <div className="step completed"></div>
        <div className="step completed"></div>
        <div className="step completed"></div>
      </div>

      <div className="welcome-text-container">
        <div className="welcome-title-wrapper">
          <span className="welcome-title">{userName}님 환영해요</span>
          <img src={welcomeEmoji} alt="Welcome" className="welcome-emoji" />
        </div>
        <br />
        <br />
        <br />
        <span className="welcome-subtitle">
          이제 소프트데이를 시작해보아요!
        </span>
      </div>
    </div>
  );
}
