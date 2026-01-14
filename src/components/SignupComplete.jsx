import React, { useEffect } from "react";
import welcomeEmoji from "../assets/welcome-emoji.png";
import "../styles/onboarding/signup-complete.css";

export function SignupComplete({ onNext, userName = "사용자" }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="signup-complete-container">
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
        <div className="info-collection-notice" style={{ marginTop: "16px", fontSize: "12px", color: "#999", textAlign: "center" }}>
          사용자 정보 수집을 시작합니다.
        </div>
      </div>
    </div>
  );
}
